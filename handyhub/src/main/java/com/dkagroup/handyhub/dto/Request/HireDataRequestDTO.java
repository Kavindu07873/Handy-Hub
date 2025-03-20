package com.dkagroup.handyhub.dto.Request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HireDataRequestDTO {

    private String  description;
    private List<String> dateRange;
}
