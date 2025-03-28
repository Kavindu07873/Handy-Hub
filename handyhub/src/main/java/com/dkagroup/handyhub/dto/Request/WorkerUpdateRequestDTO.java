package com.dkagroup.handyhub.dto.Request;

import com.dkagroup.handyhub.dto.DocumentsDTO;
import com.dkagroup.handyhub.dto.ProfessionalSkillsDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import com.dkagroup.handyhub.enums.WorkerType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WorkerUpdateRequestDTO {
    private long id;
    private MultipartFile image;
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

    private List<ProfessionalSkillsDTO> professionalSkills;
    //    private SoftSkillsDTO softSkills;
    private List<DocumentsDTO> documents;
    private WorkerResponseDTO worker;
}
