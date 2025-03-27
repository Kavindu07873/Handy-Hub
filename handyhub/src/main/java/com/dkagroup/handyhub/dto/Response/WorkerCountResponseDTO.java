package com.dkagroup.handyhub.dto.Response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WorkerCountResponseDTO {

    private int totalWorkers;
    private int electrician;
    private int plumber;
    private int meshanBass;
    private int painter;
    private int laborer;
    private int trainee;
}
