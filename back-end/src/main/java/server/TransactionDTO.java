package server;

/** Used for getting data from the front-end. */
public class TransactionDTO {
    public static final String TRUE = "true";
    
    public String username; // sender's username
    public String password; // sender's password
    public String usernameRecipient; // recipient's username
    public String publicTransaction; // visibility of the transaction
    public String paymentAmount; // amount transferred from sender to recipient
    public String paymentMethod; // cash, credit card, or account balance
    public String transactionText; // notes field
}