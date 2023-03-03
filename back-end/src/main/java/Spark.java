import static spark.Spark.*;
import com.google.gson.Gson;
import database.transactions.Transaction;
import database.transactions.TransactionCollection;
import database.users.*;
import server.*;

import java.util.ArrayList;

public class Spark {
    /** The maximum number of transactions to get from the database when
     * displaying a list of transactions. */
    private static final int MAX_TRANSACTIONS_TO_DISPLAY = 250;
    private static final Gson gson = new Gson();

    public static void main(String[] args) {
        port(1234);

        // gets a list of transactions to display in the feed on the home page
        get("/api/", (req, res) -> gson.toJson(TransactionCollection.getInstance()
                .getNLastPublicTransactions(MAX_TRANSACTIONS_TO_DISPLAY)));

        // handles logging in
        post("/api/login", (req, res) -> {
            String body = req.body();
            UserDTO userDTO = gson.fromJson(body, UserDTO.class);

            // Check for empty fields
            if (userDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter a username."));
            } else if (userDTO.password.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter a password."));
            }

            // input validation check finished
            isSuccessResponse response = UserCollection.getInstance().loginUser(userDTO);
            return gson.toJson(response);
        });

        // handles the reset password form data and sending the reset password email
        post("/api/reset-password", (req, res) -> {
            String body = req.body();
            UserDTO userDTO = gson.fromJson(body, UserDTO.class);

            // Check for empty fields
            if (userDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter a username."));
            } else if (userDTO.email.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter an email."));
            }

            // fields are non-empty. now we check if the username and email exists in the database.
            if (!UserCollection.getInstance().isValidUsernameAndEmail(userDTO.username,
                    userDTO.email)) {
                return gson.toJson(new isSuccessResponse(
                        false, "No account exists with that username and email."));
            }

            // username and email is valid. we can send the reset password email now
            String message = String.format("A link to reset your password has been sent to %s. " +
                    "(We did not actually send anything.)", userDTO.email);
            return gson.toJson(new isSuccessResponse(true, message));
        });

        // handles signing up/registration
        post("/api/sign-up", (req, res) -> {
            String body = req.body();
            UserDTO userDTO = gson.fromJson(body, UserDTO.class);

            // Check for empty fields
            if (userDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter a username."));
            } else if (userDTO.email.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter an email."));
            } else if (userDTO.password.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter a password."));
            } else if (userDTO.passwordFinal.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must confirm your password."));
            }

            // check that password and confirm password match
            else if (!userDTO.password.equals(userDTO.passwordFinal)) {
                return gson.toJson(new isSuccessResponse(
                        false, "Your password must match your confirm password."));
            } else if (!userDTO.tosResult.equals(UserDTO.TOS_ACCEPTED)) { // Terms and Conditions check
                return gson.toJson(new isSuccessResponse(false, "You must accept the Terms and Conditions."));
            }

            // input validation check finished
            isSuccessResponse response = UserCollection.getInstance().registerUser(userDTO);
            return gson.toJson(response);
        });

        // handles checking a user's account balance
        post("/api/check-balance", (req, res) -> {
            String body = req.body();
            UserDTO userDTO = gson.fromJson(body, UserDTO.class);

            // check for empty fields
            if (userDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter your username."));
            } else if (userDTO.password.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter your password."));
            }

            UserCollection userCollection = UserCollection.getInstance();

            // fields are non-empty now. check the user's credentials
            if (!userCollection.isValidUsernameAndPassword(userDTO.username, userDTO.password)) {
                return gson.toJson(new isSuccessResponse(false, "Invalid username/password combination."));
            }

            Double userBalance = userCollection.getUser(userDTO.username).getBalance();
            String message = String.format("You have $%.2f in your account.", userBalance);
            return gson.toJson(new isSuccessResponse(true, message));
        });

        // handles transferring money between the user's credit card and their account.
        // does not load real money in, just updates the user's balance.
        post("/api/manage-account-balance", (req, res) -> {
            String body = req.body();
            UserDTO userDTO = gson.fromJson(body, UserDTO.class);

            // check for empty fields
            if (userDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter your username."));
            } else if (userDTO.password.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter your password."));
            } else if (userDTO.cardholderName.equals("")) {
                return gson.toJson(new isSuccessResponse(
                        false, "You must enter your credit card's cardholder name."));
            } else if (userDTO.cardNumber.equals("")) {
                return gson.toJson(new isSuccessResponse(
                        false, "You must enter a valid credit card number."));
            } else if (userDTO.cardExpiration.equals("")) {
                return gson.toJson(new isSuccessResponse(
                        false, "You must enter your credit card's expiration date."));
            } else if (userDTO.transferAmount.equals("")) {
                return gson.toJson(new isSuccessResponse(
                        false, "You must enter a valid amount to transfer."));
            }

            String message; // used for isSuccessResponse's message

            // all fields are non-empty. now check that the credit card's fields are of a valid format
            if (!userDTO.isCardholderNameValid()) {
                message = "Your credit card's cardholder name can only include " +
                        "alphabetical letters and dashes.";
                return gson.toJson(new isSuccessResponse(false, message));
            } else if (!userDTO.isCardNumberValid()) {
                message = "Your credit card number can only include numbers in it: no dashes.";
                return gson.toJson(new isSuccessResponse(false, message));
            } else if (!userDTO.isCardExpirationValid()) {
                message = "Your credit card's expiration date must be of the format MM/YY, " +
                        "and the months must be valid.";
                return gson.toJson(new isSuccessResponse(false, message));
            }

            // credit card validated. now check that the transfer amount is non-zero
            double transferAmount = Double.parseDouble(userDTO.transferAmount);
            if (transferAmount == 0) {
                return gson.toJson(new isSuccessResponse(
                        false, "You must transfer a non-zero amount to/from your account."));
            }

            UserCollection userCollection = UserCollection.getInstance();

            // check the user's credentials
            if (!userCollection.isValidUsernameAndPassword(userDTO.username, userDTO.password)) {
                return gson.toJson(new isSuccessResponse(
                        false, "Invalid username/password combination."));
            }

            User user = userCollection.getUser(userDTO.username);

            // check to see if the user can afford to transfer the requested amount
            if (user.getBalance() + transferAmount < 0) {
                message = String.format(
                        "You cannot withdraw $%.2f because you only have $%.2f in your account.",
                        transferAmount * -1, user.getBalance());
                return gson.toJson(new isSuccessResponse(false, message));
            }

            // update the user's balance in the database after the transfer
            user.modBalance(transferAmount);
            userCollection.updateBalance(user.username, user.getBalance());

            // sets message based on whether the user withdrew or deposited money
            if (transferAmount < 0) { // withdrawal
                message = String.format("You successfully withdrew $%.2f from your account. " +
                                "Your new balance is $%.2f.",
                        transferAmount * -1, user.getBalance());
            } else { // deposit
                message = String.format("You successfully deposited $%.2f into your account. " +
                                "Your new balance is $%.2f.",
                        transferAmount, user.getBalance());
            }

            return gson.toJson(new isSuccessResponse(true, message));
        });

        // handles sending money from a registered user to another registered user
        post("/api/send-money", (req, res) -> {
            String body = req.body();
            TransactionDTO transactionDTO = gson.fromJson(body, TransactionDTO.class);

            // check for empty fields
            if (transactionDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter your username."));
            } else if (transactionDTO.password.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter your password."));
            } else if (transactionDTO.usernameRecipient.equals("")) {
                return gson.toJson(new isSuccessResponse(
                        false, "You must specify someone to send the money to."));
            } else if (transactionDTO.paymentAmount.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must specify a payment amount."));
            }

            // check that the payment amount is positive
            else if (Double.parseDouble(transactionDTO.paymentAmount) <= 0) {
                return gson.toJson(new isSuccessResponse(
                        false, "Your payment amount must be greater than $0.00."));
            }

            // fields are non-empty and valid. defer to sendMoney() to check the credentials,
            // do the actual transaction, and log the transaction in the database.
            isSuccessResponse response = TransactionCollection.getInstance().sendMoney(transactionDTO);
            return gson.toJson(response);
        });

        // displays a list of the user's personal transactions on the check transactions page
        post("/api/get-user-transactions", (req, res) ->{
            String body = req.body();
            UserDTO userDTO = gson.fromJson(body, UserDTO.class);

            // Check for empty fields
            if (userDTO.username.equals("")) {
                return gson.toJson(new isSuccessResponse(false, "You must enter a username."));
            } else if (userDTO.password.equals("")){
                return gson.toJson(new isSuccessResponse(false, "You must enter a password."));
            }

            // fields are non-empty. now we check if the username and password exists in the database.
            if (!UserCollection.getInstance().isValidUsernameAndPassword(userDTO.username,
                    userDTO.password)) {
                return gson.toJson(new isSuccessResponse(
                        false, "Invalid username/password combination."));
            }

            // all fields are valid, so get the transaction history
            ArrayList<Transaction> transactionHistory = TransactionCollection.getInstance()
                    .getUsersNLastTransactions(MAX_TRANSACTIONS_TO_DISPLAY,
                            userDTO.username);

            // check if the user actually has transactions to display
            if (transactionHistory.size() == 0) {
                return gson.toJson(new isSuccessResponse(
                        false, "You have no transaction history to display."));
            }

            return gson.toJson(transactionHistory);
        });
    }
}