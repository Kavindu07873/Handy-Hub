package com.dkagroup.handyhub.dto.Response;

import com.dkagroup.handyhub.dto.DocumentsDTO;
import com.dkagroup.handyhub.dto.ProfessionalSkillsDTO;
import com.dkagroup.handyhub.dto.SoftSkillsDTO;
import com.dkagroup.handyhub.enums.Gender;
import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import com.dkagroup.handyhub.enums.WorkerType;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WorkerInformationResponseDTO {
    private long id;
    private String image;
    private String name;
    private String email;
    private String role;
    private UserStatus status;
    private String company;
    private String phone;
    private String timezone;
    private String education;
    private String address;
    private List<String> softSkills;
    private UserRole userRole;
    private WorkerType workerType;
    private Gender gender;
    private String price;

    private List<ProfessionalSkillsDTO> professionalSkills;
//    private SoftSkillsDTO softSkills;
    private List<DocumentsDTO> documents;
    private WorkerResponseDTO worker;
}
