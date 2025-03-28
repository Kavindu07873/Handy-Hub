package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.DocumentsDTO;
import com.dkagroup.handyhub.dto.ProfessionalSkillsDTO;
import com.dkagroup.handyhub.dto.Request.WorkerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Response.RelatedProductDTO;
import com.dkagroup.handyhub.dto.Response.WorkerInformationResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.entity.Customer;
import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.entity.WorkerInformation;
import com.dkagroup.handyhub.enums.*;
import com.dkagroup.handyhub.repository.WorkerRepository;
import com.dkagroup.handyhub.service.WorkerService;
import com.dkagroup.handyhub.utill.AccessTokenValidator;
import com.dkagroup.handyhub.utill.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
public class WorkerServiceImpl implements WorkerService {

    @Autowired
    AccessTokenValidator accessTokenValidator;

    @Autowired
    private FileService fileService;
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

            Optional<Worker> workerOptional = workerRepository.findById(id);
            if (workerOptional.isPresent()) {
                Worker worker = workerOptional.get();
                WorkerResponseDTO workerResponseDTO = new WorkerResponseDTO();
                // Set worker details from the database
                workerResponseDTO.setId(worker.getId());
                workerResponseDTO.setName(worker.getUsername());
                workerResponseDTO.setPrice(worker.getPrice());
                workerResponseDTO.setDescription(worker.getDescription());
                workerResponseDTO.setWorkerType(worker.getWorkerType());
                // Convert worker images from entity format to DTO format
//                List<String> images = worker.getImageUrl().stream()
//                        .map(Image::getUrl) // Assuming Image entity has a getUrl() method
//                        .collect(Collectors.toList());
                workerResponseDTO.setImages(Collections.singletonList(worker.getImageUrl()));
                // Convert worker features from entity format to DTO format
//                List<String> features = worker.getFeatures().stream()
//                        .map(Feature::getName) // Assuming Feature entity has a getName() method
//                        .collect(Collectors.toList());
//                workerResponseDTO.setFeatures(features)
                workerResponseDTO.setRating(worker.getRating());
//                workerResponseDTO.setInWishlist(worker.isInWishlist());
//                workerResponseDTO.setColorOptions(worker.getColorOptions()); // Assuming this is stored as a list
//                workerResponseDTO.setBrand(worker.getBrand());
//                workerResponseDTO.setHasFreeShipping(worker.isHasFreeShipping());

                // Fetch related products from the database
//                List<RelatedProductDTO> relatedProducts = worker.getWorkerInformation().stream()
//                        .map(product -> {
//                            RelatedProductDTO dto = new RelatedProductDTO();
//                            dto.setId(product.getId());
//                            dto.setName(product.getName());
//                            dto.setPrice(product.getPrice());
//                            dto.setImage(product.getImageUrl()); // Assuming Product entity has a getImageUrl() method
//                            return dto;
//                        })
//                        .collect(Collectors.toList());

//                workerResponseDTO.setRelatedProducts(relatedProducts);
                return workerResponseDTO;
            } else {
                throw new EntityNotFoundException("Worker not found with ID: " + id);
            }

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
            // Retrieve user information from authentication
            User user = accessTokenValidator.retrieveUserInformationFromAuthentication();

            // Fetch worker details from the repository
            Worker worker = (Worker) workerRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Worker not found with ID: " + user.getId()));

            // Create the WorkerInformationResponseDTO
            WorkerInformationResponseDTO workerInfo = new WorkerInformationResponseDTO();
            workerInfo.setId(worker.getId());
            workerInfo.setImage(worker.getImageUrl());
            workerInfo.setName(worker.getUsername());
            workerInfo.setEmail(worker.getEmail());
            workerInfo.setRole(worker.getUserRole().name()); // Assuming it's an enum
            workerInfo.setStatus(worker.getStatus());
//            workerInfo.setCompany(worker.getCompanyName()); // Assuming there's a company field
            workerInfo.setPhone(worker.getMobileNumber());
            workerInfo.setAddress(worker.getAddress());
//            workerInfo.setTimezone(worker.getTimezone());
            workerInfo.setEducation(worker.getEducation());
            workerInfo.setWorkerType(worker.getWorkerType());
            workerInfo.setGender(worker.getGender());
            workerInfo.setCompany(worker.getCompany());
            workerInfo.setPrice(String.valueOf(worker.getPrice()));

            // Professional skills
//            if (worker.getProfessionalSkills() != null) {
//                List<ProfessionalSkillsDTO> skillsList = worker.getProfessionalSkills().stream()
//                        .map(skill -> {
//                            ProfessionalSkillsDTO skillDTO = new ProfessionalSkillsDTO();
//                            skillDTO.setImage(skill.getImageUrl());
//                            skillDTO.setText(skill.getName());
//                            return skillDTO;
//                        })
//                        .collect(Collectors.toList());
//                workerInfo.setProfessionalSkills(skillsList);
//            }

            // Soft skills
//            if (worker.getSoftSkills() != null) {
//                workerInfo.setSoftSkills(new ArrayList<>(worker.getSoftSkills()));
//            }

            // Documents
//            if (worker.getDocuments() != null) {
//                List<DocumentsDTO> documentsList = worker.getDocuments().stream()
//                        .map(doc -> {
//                            DocumentsDTO docDTO = new DocumentsDTO();
//                            docDTO.setImage(doc.getFileName());
//                            docDTO.setText(doc.getFileType());
//                            return docDTO;
//                        })
//                        .collect(Collectors.toList());
//                workerInfo.setDocuments(documentsList);
//            }

            // Worker-specific details
            WorkerResponseDTO workerResponseDTO = new WorkerResponseDTO();
            workerResponseDTO.setId(worker.getId());
            workerResponseDTO.setUsername(worker.getUsername());
            workerResponseDTO.setLastName(worker.getLastName());
            workerResponseDTO.setEmail(worker.getEmail());
            workerResponseDTO.setMobileNumber(worker.getMobileNumber());
            workerResponseDTO.setImageUrl(worker.getImageUrl());
            workerResponseDTO.setStatus(worker.getStatus());
            workerResponseDTO.setUserRole(worker.getUserRole());
            workerResponseDTO.setWorkerType(worker.getWorkerType());
            workerResponseDTO.setGender(worker.getGender());
            workerResponseDTO.setWorkerRank(worker.getWorkerRank());

            workerInfo.setWorker(workerResponseDTO);

            return workerInfo;

        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in getAllWorkerDetails: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging purposes
            throw e; // Re-throw the exception to propagate it
        }
    }

    @Override
    public WorkerInformationResponseDTO getWorkerdetailsById(long id) {
        try {
            // Retrieve user information from authentication
//            User user = accessTokenValidator.retrieveUserInformationFromAuthentication();
            // Fetch worker details from the repository
            Worker worker = workerRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Worker not found with ID: " + id));
            // Create the WorkerInformationResponseDTO
            WorkerInformationResponseDTO workerInfo = new WorkerInformationResponseDTO();
            workerInfo.setId(worker.getId());
            workerInfo.setImage(worker.getImageUrl());
            workerInfo.setName(worker.getUsername() + " " + worker.getLastName());
            workerInfo.setEmail(worker.getEmail());
            workerInfo.setRole(worker.getUserRole().name()); // Assuming it's an enum
            workerInfo.setStatus(worker.getStatus());
//            workerInfo.setCompany(worker.getCompanyName()); // Assuming there's a company field
            workerInfo.setPhone(worker.getMobileNumber());
            workerInfo.setAddress(worker.getAddress());
            workerInfo.setCompany(worker.getCompany());
            workerInfo.setPrice(String.valueOf(worker.getPrice()));

//            workerInfo.setTimezone(worker.getTimezone());
            workerInfo.setEducation(worker.getEducation());
            WorkerResponseDTO workerResponseDTO = new WorkerResponseDTO();
            workerResponseDTO.setId(worker.getId());
            workerResponseDTO.setUsername(worker.getUsername());
            workerResponseDTO.setLastName(worker.getLastName());
            workerResponseDTO.setEmail(worker.getEmail());
            workerResponseDTO.setMobileNumber(worker.getMobileNumber());
            workerResponseDTO.setImageUrl(worker.getImageUrl());
            workerResponseDTO.setStatus(worker.getStatus());
            workerResponseDTO.setUserRole(worker.getUserRole());
            workerResponseDTO.setWorkerType(worker.getWorkerType());
            workerResponseDTO.setGender(worker.getGender());
            workerResponseDTO.setWorkerRank(worker.getWorkerRank());
            workerInfo.setWorker(workerResponseDTO);
            return workerInfo;
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in getAllWorkerDetails: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging purposes
            throw e; // Re-throw the exception to propagate it
        }
    }

    @Override
    public void updateWorkerProfile(WorkerUpdateRequestDTO workerUpdateRequestDTO) {
        try {

            // Fetch the worker by ID
            Worker worker = workerRepository.findById(workerUpdateRequestDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Worker not found for ID: " + workerUpdateRequestDTO.getId()));

            // Update worker fields if they are provided in the DTO
//            if (workerUpdateRequestDTO.getName() != null) {
//                worker.setUsername(workerUpdateRequestDTO.getName());
//            }
            if (workerUpdateRequestDTO.getEmail() != null) {
                worker.setEmail(workerUpdateRequestDTO.getEmail());
            }
//            if (workerUpdateRequestDTO.getRole() != null) {
//                worker.setUserRole(workerUpdateRequestDTO.getRole());
//            }
            if (workerUpdateRequestDTO.getStatus() != null) {
                worker.setStatus(workerUpdateRequestDTO.getStatus());
            }
            if (workerUpdateRequestDTO.getWorker().getWorkerType() != null) {
                System.out.println("setWorkerType : "+workerUpdateRequestDTO.getWorkerType());
                worker.setWorkerType(workerUpdateRequestDTO.getWorkerType());
            }
            if (workerUpdateRequestDTO.getCompany() != null) {
                worker.setCompany(workerUpdateRequestDTO.getCompany());
            }
            if (workerUpdateRequestDTO.getPhone() != null) {
                worker.setMobileNumber(workerUpdateRequestDTO.getPhone());
            }
            if (workerUpdateRequestDTO.getAddress() != null) {
                worker.setAddress(workerUpdateRequestDTO.getAddress());
            }
            if (workerUpdateRequestDTO.getPrice() != null) {
                worker.setPrice(Double.parseDouble(workerUpdateRequestDTO.getPrice()));
            }
//            if (workerUpdateRequestDTO.getTimezone() != null) {
//                worker.setTimezone(workerUpdateRequestDTO.getTimezone());
//            }

            // Handle image update
//            if (workerUpdateRequestDTO.getImage() != null && !workerUpdateRequestDTO.getImage().isEmpty()) {
//                String imageUrl = fileService.saveMultipartFile(workerUpdateRequestDTO.getImage(), workerUpdateRequestDTO.getImage().getContentType());
//                worker.setImageUrl(imageUrl);
//            }

            // Save the updated worker entity
            workerRepository.save(worker);
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error updating customer profile: " + e.getMessage());
            throw new RuntimeException("Failed to update customer profile", e);
        }
    }

    public WorkerResponseDTO getAllWorkersResponseDTO(Worker workerPage) {
        WorkerResponseDTO responseDTO = new WorkerResponseDTO();

        // Set worker details
        responseDTO.setId(workerPage.getId());
        responseDTO.setName(workerPage.getUsername()); // Assuming there's a 'name' field
        responseDTO.setImageUrl(workerPage.getImageUrl());
        responseDTO.setPrice(workerPage.getPrice()); // Assuming the Worker entity has a price field
        responseDTO.setDescription(workerPage.getDescription()); // Assuming there's a description
        responseDTO.setEmail(workerPage.getEmail());
        responseDTO.setMobileNumber(workerPage.getMobileNumber());
        responseDTO.setWorkerType(workerPage.getWorkerType());


        // Convert features list
//            if (workerPage.getFeatures() != null) {
//                responseDTO.setFeatures(workerPage.getFeatures().stream()
//                        .map(Feature::getName) // Assuming Feature entity has a 'getName()' method
//                        .collect(Collectors.toList()));
//            }

        // Convert images list
//            if (workerPage.getImages() != null) {
//                responseDTO.setImages(workerPage.getImages().stream()
//                        .map(Image::getUrl) // Assuming Image entity has a 'getUrl()' method
//                        .collect(Collectors.toList()));
//            }
        responseDTO.setImages(Collections.singletonList(workerPage.getImageUrl()));
        // Set additional attributes
        responseDTO.setRating(workerPage.getRating()); // Assuming Worker has a rating field
//            responseDTO.setInWishlist(workerPage.isInWishlist()); // Assuming boolean field
//            responseDTO.setColorOptions(workerPage.getColorOptions()); // Assuming a list of color options
//            responseDTO.setBrand(workerPage.getBrand()); // Assuming there's a brand field
//            responseDTO.setHasFreeShipping(workerPage.isHasFreeShipping()); // Boolean field

        // Convert related products
//            if (workerPage.getRelatedProducts() != null) {
//                List<RelatedProductDTO> relatedProducts = workerPage.getRelatedProducts().stream()
//                        .map(product -> {
//                            RelatedProductDTO dto = new RelatedProductDTO();
//                            dto.setId(product.getId());
//                            dto.setName(product.getName());
//                            dto.setPrice(product.getPrice());
//                            dto.setImage(product.getImageUrl()); // Assuming Product entity has an image URL
//                            return dto;
//                        })
//                        .collect(Collectors.toList());
//                responseDTO.setRelatedProducts(relatedProducts);
//            }

        return responseDTO;
    }


}
