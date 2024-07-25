package ru.arsentiev.backshortlink.handler;

public class EmailException extends RuntimeException {
    private static final String MESSAGE = "Problems with send to email. Try again later.";

    public EmailException() {
        super(MESSAGE);
    }
}
