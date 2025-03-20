package com.dkagroup.handyhub.dto.Request;

import com.dkagroup.handyhub.dto.Response.CustomerInformationResponseDTO;
import com.dkagroup.handyhub.enums.CustomerRank;
import com.dkagroup.handyhub.enums.Gender;
import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerUpdateRequestDTO {
    private long id;
    private String username;
    private String lastName;
    private String email;
    private String mobileNumber;
    private UserStatus status;
    private UserRole userRole;
    private Gender gender;
    private CustomerRank customerRank;
    private CustomerInformationResponseDTO customerInformationResponseDTO;


    private String image;
    private String name;
    private String role;
    private String company;
    private String phone;
    private String address;
    private String timezone;
}
