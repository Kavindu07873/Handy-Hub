package com.dkagroup.handyhub.dto.Response;

import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.entity.WorkerInformation;
import com.dkagroup.handyhub.enums.*;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkerResponseDTO {
    private long id;
    private String username;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String imageUrl;
    private UserStatus status;
    private UserRole userRole;
    private WorkerType workerType;
    private Gender gender;
    private WorkerRank workerRank;
    private  WorkerInformationResponseDTO workerInformationResponseDTO;


    private String name; // Product/Worker Name
    private double price; // Price (if applicable)
    private String description; // Description of the worker/product
    private List<String> images; // List of image URLs
    private List<String> features; // Key features of the worker/product
    private double rating; // Rating (e.g., 4.5)
    private boolean inWishlist; // Whether the worker/product is in the wishlist
    private List<String> colorOptions; // Available color options (hex codes)
    private String brand; // Brand or category of the worker/product
    private boolean hasFreeShipping; // Indicates if free shipping is available
    private List<RelatedProductDTO> relatedProducts; // Related products/workers

}
