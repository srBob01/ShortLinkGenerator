package ru.arsentiev.backshortlink.handler;

import lombok.Getter;

@Getter
public class DuplicateFieldException extends RuntimeException {
    private final String field;

    public DuplicateFieldException(String message, String field) {
        super(message);
        this.field = field;
    }
}
