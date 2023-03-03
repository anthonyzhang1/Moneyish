package server;

/** Represents whether an action was successful or not, with a message detailing why. */
public class isSuccessResponse {
    public boolean isSuccess;
    public String message;

    public isSuccessResponse(boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}