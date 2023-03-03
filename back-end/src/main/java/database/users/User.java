package database.users;

import org.bson.Document;
import server.UserDTO;

/** The actual User object stored in the users database. */
public class User {
    public String username;
    public String email;
    public String password;
    private double balance; // money in account

    private User(String username, String email, String password, double balance) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }

    /** Creates a new User instance from a UserDTO instance. */
    public User(UserDTO userDTO) {
        this.username = userDTO.username;
        this.email = userDTO.email;
        this.password = userDTO.password;
    }

    /** Returns the User instance as a Document. */
    public Document toDocument() {
        return new Document("username", username)
                    .append("email", email)
                    .append("password", password)
                    .append("balance", balance);
    }
    
    /** Returns a User instance created from a Document. */
    public static User fromDocument(Document document) {
        return new User(document.getString("username"),
                        document.getString("email"),
                        document.getString("password"),
                        document.getDouble("balance"));
    }

    public double getBalance() { return balance; }
    
    /** Sets this user's balance. If the balance is negative, the balance will be set to 0. */
    public User setBalance(double balance) {
        this.balance = (balance >= 0) ? balance : 0;
        return this;
    }

    /** Modify the user's balance by a positive or negative amount.
      * If the balance would go negative, the balance is set to 0. */
    public void modBalance(double amount) {
        balance += amount;
        if (balance < 0) balance = 0;
    }
}