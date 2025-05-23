package com.dkagroup.handyhub.dto;

import com.dkagroup.handyhub.enums.Gender;
import com.dkagroup.handyhub.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class RegisterUserRequestDTO {

    private String username;
    private String email;
    private UserRole role;
    private String password;
    private Gender gender;

//    // Getter and Setter for username
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    // Getter and Setter for email
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    // Getter and Setter for role
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    // Getter and Setter for password
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
}