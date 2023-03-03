package database.transactions;

import org.bson.Document;
import server.TransactionDTO;

/** The actual Transaction object stored in the transactions database. */
public class Transaction {
    public static final String CASH_PAYMENT = "Cash";
    public static final String CREDIT_PAYMENT = "Credit Card";
    public static final String ACCOUNT_PAYMENT = "Account Balance";
    
    public String recipient; // to
    public String sender; // from
    public double amount;
    public String type; // cash, credit card, or account balance
    public String notes; // notes the user entered about the transaction
    public boolean isPublic; // visibility of the transaction in the public feed

    private Transaction(String recipient, String sender, double amount,
                        String type, String notes, boolean isPublic) {
        this.recipient = recipient;
        this.sender = sender;
        this.amount = amount;
        this.type = type;
        this.notes = notes;
        this.isPublic = isPublic;
    }

    /** Creates a new Transaction instance from a TransactionDTO instance. */
    public Transaction(TransactionDTO transactionDTO) {
        this.recipient = transactionDTO.usernameRecipient;
        this.sender = transactionDTO.username;
        this.amount = Double.parseDouble(transactionDTO.paymentAmount);
        this.type = transactionDTO.paymentMethod;
        this.notes = transactionDTO.transactionText;
        this.isPublic = transactionDTO.publicTransaction.equals(TransactionDTO.TRUE);
    }

    /** Returns the Transaction instance as a Document. */
    public Document toDocument() {
        return new Document("recipient", recipient)
                   .append("sender", sender)
                   .append("amount", amount)
                   .append("type", type)
                   .append("notes", notes)
                   .append("isPublic", isPublic);
    }

    /** Returns a Transaction instance created from a Document. */
    public static Transaction fromDocument(Document document) {
        return new Transaction(document.getString("recipient"),
                               document.getString("sender"),
                               document.getDouble("amount"),
                               document.getString("type"),
                               document.getString("notes"),
                               document.getBoolean("isPublic"));
    }
}