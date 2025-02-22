package com.dkagroup.handyhub.dto.Response;

import com.dkagroup.handyhub.entity.Worker;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkerResponseDTO {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private String imageUrl;


}
