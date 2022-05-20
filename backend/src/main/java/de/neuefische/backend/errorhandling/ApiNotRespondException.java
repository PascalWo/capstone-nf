package de.neuefische.backend.errorhandling;

public class ApiNotRespondException extends RuntimeException{
    public ApiNotRespondException(String errorMessage) {
        super(errorMessage);
    }
}
