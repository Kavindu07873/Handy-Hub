package com.dkagroup.handyhub.dto.common;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ErrorMessageResponseDTO {
    private boolean success;
    private int status;
    private String msg;
    // Constructor matching your usage in AppExceptionHandler
    public ErrorMessageResponseDTO(boolean success, int status, String message) {
        this.success = success;
        this.status = status;
        this.msg = message;
    }
}
