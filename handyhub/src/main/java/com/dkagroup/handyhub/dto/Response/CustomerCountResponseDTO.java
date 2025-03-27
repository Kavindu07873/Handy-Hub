package com.dkagroup.handyhub.dto.Response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CustomerCountResponseDTO {

    private int totalCustomers;
    private int newbieCustomers;
    private int bronzeCustomers;
    private int silverCustomers;
    private int goldCustomers;
    private int platinumCustomers;
    private int diamondCustomers;

}
