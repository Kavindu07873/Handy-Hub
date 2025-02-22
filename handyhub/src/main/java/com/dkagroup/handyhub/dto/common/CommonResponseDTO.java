package com.dkagroup.handyhub.dto.common;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponseDTO {
    private boolean success;
    private Object body;
    private String msg;

    public CommonResponseDTO(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public CommonResponseDTO(boolean success, Object body) {
        this.success = success;
        this.body = body;
    }

    public CommonResponseDTO(boolean success, String msg, Object body) {
        this.success = success;
        this.body = body;
        this.msg = msg;
    }
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
