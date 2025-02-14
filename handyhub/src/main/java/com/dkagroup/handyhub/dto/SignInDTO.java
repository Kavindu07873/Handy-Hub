package com.dkagroup.handyhub.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignInDTO {
    private String  username;
    private String  email;
    private String  role;
    private String  password;

}
