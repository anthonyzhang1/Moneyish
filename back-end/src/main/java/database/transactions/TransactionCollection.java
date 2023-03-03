package database.transactions;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import database.MongoConnection;
import database.users.*;
import java.util.ArrayList;
import java.util.stream.Collectors;
import org.bson.Document;
import org.bson.conversions.Bson;
import server.TransactionDTO;
import server.isSuccessResponse;

/** Handles the transaction collection. */
public class TransactionCollection {
    private static TransactionCollection instance;
    private final MongoCollection<Document> transactions;

    private TransactionCollection(MongoCollection<Document> collection) {
        this.transactions = collection;
    }

    /** Initialize TransactionCollection and the MongoCollection if
      * it was not initialized already. Returns this instance. */
    public static TransactionCollection getInstance() {
        if (instance == null) {
            instance = new TransactionCollection(MongoConnection.getCollection("Transactions"));
        }
        
        return instance;
    }
    
    /** Attempts to send money between the recipient and sender in the given TransactionDTO.
      * On success, log the payment in the database and return a successful isSuccessResponse.
      * On failure, do not log anything and return a failed one. */
    public isSuccessResponse sendMoney(TransactionDTO transactionDTO) {
        UserCollection userCollection = UserCollection.getInstance();
        
        // if the sender and recipient are the same account
        if (transactionDTO.username.equals(transactionDTO.usernameRecipient)) {
            return new isSuccessResponse(false, "You cannot send money to yourself.");
        } // check the sender's login credentials
        else if (!userCollection.isValidUsernameAndPassword(transactionDTO.username,
                                                            transactionDTO.password)) {
            return new isSuccessResponse(false, "Invalid username/password combination.");
        }

        User sender = userCollection.getUser(transactionDTO.username);
        User recipient = userCollection.getUser(transactionDTO.usernameRecipient);
        
        if (recipient == null) { // check if recipient is valid
            return new isSuccessResponse(
                       false, "The user you are sending money to does not exist.");
        }

        String message; // holds the isSuccessResponse message
        Transaction transaction = new Transaction(transactionDTO);
        
        // if the sender is paying via account balance, check that they have enough money to send 
        if (transaction.type.equals(Transaction.ACCOUNT_PAYMENT)
            && (sender.getBalance() < transaction.amount)) {
            message = String.format(
                      "You do not have enough money in your account to send $%.2f. " +
                      "You only have $%.2f in your account.\n",
                      transaction.amount, sender.getBalance());
            return new isSuccessResponse(false, message);
        }
        
        // make the payment and log the transaction in the server
        switch (transaction.type) {
        case Transaction.CASH_PAYMENT:
            // no account balances are changed, just log the transaction in the server
            logTransaction(transaction);

            message = String.format("Your cash transaction of $%.2f has been logged.",
                                    transaction.amount);
            return new isSuccessResponse(true, message);
        case Transaction.CREDIT_PAYMENT:
            // only the recipient's balance is changed. update it in the users database.
            recipient.modBalance(transaction.amount);
            userCollection.updateBalance(recipient.username, recipient.getBalance());
            logTransaction(transaction);
            
            message = String.format("Successfully sent $%.2f to '%s' using your credit card.",
                                    transaction.amount, recipient.username);
            return new isSuccessResponse(true, message);
        case Transaction.ACCOUNT_PAYMENT:
            // both the sender and recipient's balances are changed. sender has enough money
            // in their account due to a prior check. update both balances in the database.
            sender.modBalance(-transaction.amount);
            recipient.modBalance(transaction.amount);
            userCollection.updateBalance(sender.username, sender.getBalance());
            userCollection.updateBalance(recipient.username, recipient.getBalance());
            logTransaction(transaction);
            
            message = String.format(
                      "Successfully transferred $%.2f to '%s' from your account balance. " +
                      "You have $%.2f left in your account.\n",
                      transaction.amount, recipient.username, sender.getBalance());
            return new isSuccessResponse(true, message);
        default:
            // somehow the payment did not match any of the valid payment types
            return new isSuccessResponse(false,
                       "A server error occurred. Your money was not sent. Please try again.");
        }
    }

    /** Logs the transaction into the collection. */
    public void logTransaction(Transaction transaction) {
        transactions.insertOne(transaction.toDocument());
    }
    
    /** Gets the last `count` public transactions in the database as an ArrayList.
      * The newest transactions will appear at the beginning of the list,
      * i.e. the list goes from newest to oldest. */
    public ArrayList<Transaction> getNLastPublicTransactions(int count) {
        return (ArrayList<Transaction>)
               transactions.find(new Document("isPublic", true))
                           .sort(new BasicDBObject("$natural", -1))
                           .limit(count)
                           .into(new ArrayList<>())
                           .stream()
                           .map(Transaction::fromDocument)
                           .collect(Collectors.toList());
    }

    /** Gets the last `count` transactions where `username` was a sender or a recipient,
      * as an ArrayList. The newest transactions will appear at the beginning of the list,
      * i.e. the list goes from newest to oldest. */
    public ArrayList<Transaction> getUsersNLastTransactions(int count, String username) {
        // we are looking for transactions where username is the sender or the recipient
        Bson filter = Filters.or(Filters.eq("sender", username),
                                 Filters.eq("recipient", username));
        
        return (ArrayList<Transaction>)
               transactions.find(filter)
                           .sort(new BasicDBObject("$natural", -1))
                           .limit(count)
                           .into(new ArrayList<>())
                           .stream()
                           .map(Transaction::fromDocument)
                           .collect(Collectors.toList());
    }

    /** Gets all the transactions in the database as an ArrayList. The oldest transactions
      * will appear at the beginning of the list, i.e. the list goes from oldest to newest. */
    public ArrayList<Transaction> getAllTransactions() {
        return (ArrayList<Transaction>)
               transactions.find()
               .into(new ArrayList<>())
               .stream()
               .map(Transaction::fromDocument)
               .collect(Collectors.toList());
    }
}