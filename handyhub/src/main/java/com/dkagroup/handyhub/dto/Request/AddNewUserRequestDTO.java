package com.dkagroup.handyhub.dto.Request;

import com.dkagroup.handyhub.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddNewUserRequestDTO {
    private String fullName;
    private String salary;
    private String address;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;
}
