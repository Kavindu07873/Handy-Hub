package com.dkagroup.handyhub.dto.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommonResponseDTO {
    private boolean success;
    private String msg;
    private Object body;

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
        this.msg = msg;
        this.body = body;
    }
}
