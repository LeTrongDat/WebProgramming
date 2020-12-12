package com.company.exception;

public class WebLabException extends RuntimeException {
    public WebLabException() { super(); };

    public WebLabException(String message) {
        super(message);
    };
}
