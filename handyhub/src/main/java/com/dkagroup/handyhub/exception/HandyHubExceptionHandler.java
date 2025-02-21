package com.dkagroup.handyhub.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HandyHubExceptionHandler extends RuntimeException{
    @Getter
    private int status;
    private String message;

    public HandyHubExceptionHandler(int status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public int getStatus() {  // 👈 Explicitly add the getter
        return status;
    }
}
