package server;

import java.util.regex.Pattern;

/** Used for getting and checking data from the front-end. */
public class UserDTO {
    public static final String TOS_ACCEPTED = "tosYes";
    
    public String username;
    public String email;
    public String password;
    public String passwordFinal; // confirm password
    public String tosResult; // terms and conditions radio button result
    public String transferAmount; // how much to transfer to/from account
    public String cardholderName;
    public String cardNumber;
    public String cardExpiration;

    /** A cardholder's name should only contain alphabetical characters, dashes, and spaces. */
    private static final String CARDHOLDER_NAME_PATTERN = "[a-zA-Z\\- ]+";
    /** A card number should only consist of digits. */
    private static final String CARD_NUMBER_PATTERN = "\\d+";
    /** A card expiration date is of the form MM/YY. */
    private static final String CARD_EXPIRATION_PATTERN = "(0[1-9]|1[0-2])/\\d{2}";
    
    /** Returns true if the cardholder's name is valid. Returns false if it is not. */
    public boolean isCardholderNameValid() {
        return Pattern.matches(CARDHOLDER_NAME_PATTERN, cardholderName);
    }
    
    /** Returns true if the card number is valid. Returns false if it is not. */
    public boolean isCardNumberValid() {
        return Pattern.matches(CARD_NUMBER_PATTERN, cardNumber);
    }
    
    /** Returns true if the card expiration date is valid. Returns false if it is not. */
    public boolean isCardExpirationValid() {
        return Pattern.matches(CARD_EXPIRATION_PATTERN, cardExpiration);
    }
}