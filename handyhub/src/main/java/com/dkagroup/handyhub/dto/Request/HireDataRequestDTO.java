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
    private String  address;
    private String  location;
    private String  comment;
    private long  workerId;
    private int peoplesQuantity;
    private int quantity;
    private String startDate;
    private String endDate;

    private List<String> dateRange;

}
