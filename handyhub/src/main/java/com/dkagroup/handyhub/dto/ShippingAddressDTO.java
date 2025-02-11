package com.dkagroup.handyhub.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ShippingAddressDTO {
    private String  postalCode;
    private String phone;
    private String  detailedAddress;
    private String city;
}
