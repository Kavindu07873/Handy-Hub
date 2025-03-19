package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.Response.RelatedProductDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.repository.WorkerRepository;
import com.dkagroup.handyhub.service.WorkerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class WorkerServiceImpl implements WorkerService {

    private final WorkerRepository workerRepository;

    public WorkerServiceImpl(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }


    @Override
    public Page<WorkerResponseDTO> getAllWorkerListWithPagination(String category, String search, Integer page, Integer size) {
        try {
            System.out.println("Execute method getAllWorkerListWithPagination ");
            Page<WorkerResponseDTO> responseDTOS = null;
            Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 10);

            Page<Worker> workerPage = workerRepository.findAll(pageable);

            responseDTOS = workerPage.map(this::getAllWorkersResponseDTO);
//            return workerPage.stream().map(WorkerResponseDTO::worker).toList();
            return responseDTOS;
        } catch (Exception e) {
            System.out.println("Method getAllBatches : " + e.getMessage() + " " + e);
            throw e;
        }
    }

    @Override
    public WorkerResponseDTO getAllWorkerDetails(long id) {
        try {
            // Create the main DTO object
            WorkerResponseDTO dto = new WorkerResponseDTO();

            // Set worker details
            dto.setId(id); // Use the provided `id` parameter instead of hardcoding it
            dto.setName("ABCD");
            dto.setPrice(149.99);
            dto.setDescription("High-quality wireless headphones with 20-hour battery life and noise cancellation");

            // Use Arrays.asList() instead of List.of()
            dto.setImages(Arrays.asList("https://i5.walmartimages.com/asr/de03acff-5b8a-40c6-b30e-472ccac63b1a_1.d1d018fe917627a1cd9f46142c001bcc.jpeg"));
            dto.setFeatures(Arrays.asList("Noise cancellation", "20h battery", "Bluetooth 5.0"));
            dto.setRating(4.5);
            dto.setInWishlist(false);
            dto.setColorOptions(Arrays.asList("#007bff", "#28a745", "#dc3545"));
            dto.setBrand("AudioTech");
            dto.setHasFreeShipping(true);

            // Add related products
            RelatedProductDTO relatedProduct1 = new RelatedProductDTO();
            relatedProduct1.setId(2L); // Use `long` (or `Long`) for IDs to match the type
            relatedProduct1.setName("Smart Fitness Tracker");
            relatedProduct1.setPrice(59.99);
            relatedProduct1.setImage("/images/fitness-tracker.jpg");

            RelatedProductDTO relatedProduct2 = new RelatedProductDTO();
            relatedProduct2.setId(3L); // Use `long` (or `Long`) for IDs to match the type
            relatedProduct2.setName("Wireless Earbuds");
            relatedProduct2.setPrice(79.99);
            relatedProduct2.setImage("/images/earbuds.jpg");

            // Use Arrays.asList() for related products
            dto.setRelatedProducts(Arrays.asList(relatedProduct1, relatedProduct2));

            return dto;
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in getAllWorkerDetails: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging purposes
            throw e; // Re-throw the exception to propagate it
        }
    }

    public WorkerResponseDTO getAllWorkersResponseDTO(Worker workerPage) {
        WorkerResponseDTO responseDTO = new WorkerResponseDTO();
        responseDTO.setId(workerPage.getId());
//        responseDTO.setName(workerPage.getUsername());
        responseDTO.setImageUrl(workerPage.getImageUrl());
        responseDTO.setId(workerPage.getId());
//        responseDTO.setPrice(1500.00);
        return responseDTO;
    }
}
