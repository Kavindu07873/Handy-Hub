package com.dkagroup.handyhub.dto.Response;

import lombok.*;

// Nested DTO for related products
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RelatedProductDTO {
    private long id; // Related product ID
    private String name; // Related product name
    private double price; // Related product price
    private String image; // Related product image URL
}
