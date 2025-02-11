package com.dkagroup.handyhub.dto;

import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import lombok.*;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String  username;
//    private String  lastName;
    private String  email;
//    private String  mobileNumber;
    private String  password;
    private UserRole userRole;
//    private UserStatus userstatus;

    // Public constructor
    public UserDTO(Long id, String email, String username, UserRole userRole) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.userRole = userRole;
    }

}
