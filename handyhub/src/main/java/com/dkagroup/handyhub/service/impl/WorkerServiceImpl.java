package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.DocumentsDTO;
import com.dkagroup.handyhub.dto.ProfessionalSkillsDTO;
import com.dkagroup.handyhub.dto.Response.RelatedProductDTO;
import com.dkagroup.handyhub.dto.Response.WorkerInformationResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.enums.*;
import com.dkagroup.handyhub.repository.WorkerRepository;
import com.dkagroup.handyhub.service.WorkerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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

    @Override
    public WorkerInformationResponseDTO getWorkerdetails() {
        try {

            WorkerInformationResponseDTO workerInfo = new WorkerInformationResponseDTO();
            workerInfo.setId(1);
            workerInfo.setImage("https://example.com/image.jpg");
            workerInfo.setName("John Doe");
            workerInfo.setEmail("john.doe@example.com");
            workerInfo.setRole("Admin");
            workerInfo.setStatus(UserStatus.ACTIVE);
            workerInfo.setCompany("Tech Corp");
            workerInfo.setPhone("+1 (555) 123-4567");
            workerInfo.setAddress("123 Main St, New York, NY");
            workerInfo.setTimezone("GMT-05:00");
            workerInfo.setEducation("Bachelor of Science in Computer Engineering\nStanford University (2015-2019)");

            // Professional skills

            ProfessionalSkillsDTO professionalSkillsDTO = new ProfessionalSkillsDTO();
            professionalSkillsDTO.setImage("https://example.com/cloud.jpg");
            professionalSkillsDTO.setText("Cloud Architecture");

            List<ProfessionalSkillsDTO> skillsList = new ArrayList<>();
            skillsList.add(professionalSkillsDTO);

            workerInfo.setProfessionalSkills(skillsList);


            // Soft skills
            workerInfo.setSoftSkills(Collections.singletonList("Team leadership\nCommunication\nProblem-solving"));


            DocumentsDTO documentsDTO = new DocumentsDTO();
            documentsDTO.setImage("resume.pdf");
            documentsDTO.setText("application/pdf");

            List<DocumentsDTO> documentsList = new ArrayList<>();
            documentsList.add(documentsDTO);

            workerInfo.setDocuments(documentsList);


            // Documents
//            workerInfo.setDocuments((com.dkagroup.handyhub.dto.DocumentsDTO) Arrays.asList("resume.pdf",
//                    "application/pdf", "...", "portfolio.docx", "application/msword", "..."));

            // Worker-specific details
            WorkerResponseDTO worker = new WorkerResponseDTO();
            worker.setId(1);
            worker.setUsername("worker_john");
            worker.setLastName("Doe");
            worker.setEmail("worker.john@example.com");
            worker.setMobileNumber("+1 (555) 987-6543");
            worker.setImageUrl("data:image/jpeg;base64,...");
            worker.setStatus(UserStatus.ACTIVE);
            worker.setUserRole(UserRole.WORKER);
            worker.setWorkerType(WorkerType.TRAINEE);
            worker.setGender(Gender.MALE);
            worker.setWorkerRank(WorkerRank.EXPERT);

            workerInfo.setWorker(worker);
            return workerInfo;

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
