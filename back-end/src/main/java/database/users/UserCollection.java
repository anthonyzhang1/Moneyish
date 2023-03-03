package database.users;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import database.MongoConnection;
import org.bson.Document;
import server.UserDTO;
import server.isSuccessResponse;

/** Handles the username/password collection. */
public class UserCollection {
    private static UserCollection instance;
    private final MongoCollection<Document> users;

    private UserCollection(MongoCollection<Document> collection) { this.users = collection; }

    /** Initialize UserCollection and the MongoCollection if it was not initialized already.
      * Returns this instance. */
    public static UserCollection getInstance() {
        if (instance == null) instance = new UserCollection(MongoConnection.getCollection("Users"));
        return instance;
    }

    /** Attempt to log the user in with the given credentials. Returns an isSuccessResponse
      * object with whether the login succeeded or failed, and a relevant message. */
    public isSuccessResponse loginUser(UserDTO userDTO) {
        User user = new User(userDTO);
        
        // find the account with the given username
        Document account = users.find(new Document("username", user.username)).first();

        // if user does not exist or the password provided does not match the one on file
        if (account == null || !account.get("password").equals(user.password)) {
            return new isSuccessResponse(false, "Invalid username/password combination.");
        }
        
        // at this point, the login credentials are valid
        return new isSuccessResponse(true, "Successfully logged in.");
    }
    
    /** Check if an account exists with the given username and password.
      * Returns true if it does, false if not. */
    public boolean isValidUsernameAndPassword(String username, String password) {
        // find the account with the given username
        Document account = users.find(new Document("username", username)).first();

        // if the account exists and the password matches the one on file,
        // the credentials are valid
        return account != null && account.get("password").equals(password); 
    }

    /** Check if an account exists with the given username and email.
      * Returns true if it does, false if not. */
    public boolean isValidUsernameAndEmail(String username, String email) {
        // find the account with the given username
        Document account = users.find(new Document("username", username)).first();

        // if the account exists and the email matches the one on file,
        // the credentials are valid
        return account != null && account.get("email").equals(email);
    }
    
    /** Attempts to add 'userDTO' into 'users'. Returns an isSuccessResponse object with
      * whether the add succeeded or failed, and a relevant message. */
    public isSuccessResponse registerUser(UserDTO userDTO) {
        // create the User instance we will add to the database from the UserDTO given
        User user = new User(userDTO).setBalance(0);
        
        // check if the username was already taken
        Document account = users.find(new Document("username", user.username)).first();
        if (account != null) {
            return new isSuccessResponse(false, "The username '" + user.username
                                              + "' has already been taken.");
        }
        
        // check if the email was already taken
        account = users.find(new Document("email", user.email)).first();
        if (account != null) {
            return new isSuccessResponse(false, "The email '" + user.email + "' is already in use.");
        }
        
        // username and email not taken, so we can register this user
        users.insertOne(user.toDocument());
        return new isSuccessResponse(true, "Account successfully created.");
    }
    
    /** Checks whether a user exists in the database.
      * Returns true if they exist, false otherwise. */
    public boolean isValidUser(String username) {
        return users.find(new Document("username", username)).first() != null;
    }
    
    /** Given the user's username, returns that user's instance and all of its data members
      * from the collection. Returns null if no such user exists. */
    public User getUser(String username) {
        // find the account with the given username
        Document account = users.find(new Document("username", username)).first();
        if (account == null) return null;
        
        return User.fromDocument(account);
    }
    
    /** Updates the balance of the account with the given username in the database. */
    public void updateBalance(String username, double balance) {
        users.updateOne(Filters.eq("username", username), Updates.set("balance", balance));
    }
}