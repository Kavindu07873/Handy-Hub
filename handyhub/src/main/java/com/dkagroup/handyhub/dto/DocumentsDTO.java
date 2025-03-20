package com.dkagroup.handyhub.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class DocumentsDTO {
    private String text;
    private String image;
}
