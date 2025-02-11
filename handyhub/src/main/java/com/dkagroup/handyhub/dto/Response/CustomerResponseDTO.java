package com.dkagroup.handyhub.dto.Response;

import com.dkagroup.handyhub.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerResponseDTO {
    private String fullName;
    private String email;
    private String password;
    private UserRole userRole;

}
