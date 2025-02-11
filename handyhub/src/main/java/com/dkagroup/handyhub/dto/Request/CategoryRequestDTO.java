package com.dkagroup.handyhub.dto.Request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CategoryRequestDTO {
    private String  name;
    private String description;
    private MultipartFile image;
}
