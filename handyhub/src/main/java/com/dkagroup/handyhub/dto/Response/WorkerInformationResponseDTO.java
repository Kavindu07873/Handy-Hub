package com.dkagroup.handyhub.dto.Response;

import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;

import javax.persistence.*;

public class WorkerInformationResponseDTO {
    private long id;
    private String username;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String password;
    private UserStatus status;
    private UserRole userRole;
}
