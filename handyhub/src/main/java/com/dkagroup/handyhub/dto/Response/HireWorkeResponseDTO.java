package com.dkagroup.handyhub.dto.Response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HireWorkeResponseDTO {
    private long id;
    private String title;
    private String description;
    private String address;
    private String price;
    private String status;
    private String dueDate;
    private String completion;
}
