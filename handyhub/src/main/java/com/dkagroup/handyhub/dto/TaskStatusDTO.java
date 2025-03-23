package com.dkagroup.handyhub.dto;

import com.dkagroup.handyhub.enums.TaskType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TaskStatusDTO {
    private TaskType status;
}
