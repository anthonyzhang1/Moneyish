package database;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MongoConnection {
    private static final MongoClient mongoClient = new MongoClient("localhost", 27017);

    public static MongoDatabase getDatabase() { return mongoClient.getDatabase("Moneyish"); }
    
    /** Deletes the database. Used primarily for testing our website.
      * Uncomment the function if you want to use it. */
    // public static void dropDatabase() { mongoClient.dropDatabase("Moneyish"); }

    public static MongoCollection<Document> getCollection(String collectionName) {
        return getDatabase().getCollection(collectionName);
    }
}