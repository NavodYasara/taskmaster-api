package com.taskmaster.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// This tells Spring: "When this exception is thrown, send back a 404 Not Found response"
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    // This constructor accepts a custom message, like "User with ID 99 not found"
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
