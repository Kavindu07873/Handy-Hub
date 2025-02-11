package com.dkagroup.handyhub.dto;

import com.dkagroup.handyhub.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AdminDTO {
    private long id;
    private String  name;
    private String  email;
    private String  password;
    private UserRole userRole;
    private String  mobileNumber;
}
