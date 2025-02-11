package com.dkagroup.handyhub.dto.Request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartRequestDTO {
    private long productId;
    private int quantity;
}
