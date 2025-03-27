package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.Request.CustomerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Response.CustomerResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.entity.Customer;
import com.dkagroup.handyhub.entity.Hire;
import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.enums.CustomerRank;
import com.dkagroup.handyhub.enums.TaskType;
import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import com.dkagroup.handyhub.repository.CustomerRepository;
import com.dkagroup.handyhub.service.CustomerService;
import com.dkagroup.handyhub.service.HireService;
import com.dkagroup.handyhub.utill.AccessTokenValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomerServiceImpl implements CustomerService {


    @Autowired
    AccessTokenValidator accessTokenValidator;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public CustomerResponseDTO getCustomerProfile() {
        try {
            User user = accessTokenValidator.retrieveUserInformationFromAuthentication();

            Customer customer = customerRepository.findByUserId(user.getId());


            CustomerResponseDTO customerResponseDTO = new CustomerResponseDTO();
            customerResponseDTO.setImage(customer.getImageUrl());
            customerResponseDTO.setName(customer.getUsername());
            customerResponseDTO.setEmail(customer.getEmail());
            customerResponseDTO.setRole(String.valueOf(customer.getUserRole()));
            customerResponseDTO.setStatus(UserStatus.ACTIVE);
//            customerResponseDTO.setCompany(customer.);
            customerResponseDTO.setPhone(customer.getMobileNumber());
            customerResponseDTO.setAddress(customer.getAddress());
//            customerResponseDTO.setTimezone("GMT-05:00");
            System.out.println(customerResponseDTO);
            customerResponseDTO.setGender(customer.getGender());
            customerResponseDTO.setLastName(customer.getLastName());
            customerResponseDTO.setUsername(customer.getUsername());

            return customerResponseDTO;
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in getCustomerProfile: " + e.getMessage());
            throw e; // Re-throw the exception to propagate it
        }
    }

    @Override
    public void updateCustomerProfile(CustomerUpdateRequestDTO customerUpdateRequestDTO) {
        try {
            User user = accessTokenValidator.retrieveUserInformationFromAuthentication();

            Customer customer = customerRepository.findByUserId(user.getId());

            if (customer == null) {
                throw new RuntimeException("Customer not found for user ID: " + user.getId());
            }

            // Update customer fields
            customer.setUsername(customerUpdateRequestDTO.getUsername());
            customer.setLastName(customerUpdateRequestDTO.getLastName());
            customer.setEmail(customerUpdateRequestDTO.getEmail());
            customer.setMobileNumber(customerUpdateRequestDTO.getPhone());
            customer.setGender(customerUpdateRequestDTO.getGender());
            customer.setImageUrl(customerUpdateRequestDTO.getImage());
            customer.setAddress(customerUpdateRequestDTO.getAddress());
            // Save the updated customer
            customerRepository.save(customer);
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error updating customer profile: " + e.getMessage());
            throw new RuntimeException("Failed to update customer profile", e);
        }
    }

    @Override
    public Page<CustomerResponseDTO> getAllCustomerListWithPagination(Integer page, Integer size) {
        try {
            System.out.println("Execute method getAllWorkerListWithPagination ");
            Page<CustomerResponseDTO> responseDTOS = null;
            Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 10);

            Page<Customer> workerPage = customerRepository.findAll(pageable);

            responseDTOS = workerPage.map(this::getAllCustomerResponseDTO);
//            return workerPage.stream().map(WorkerResponseDTO::worker).toList();
            return responseDTOS;
        } catch (Exception e) {
            System.out.println("Method getAllBatches : " + e.getMessage() + " " + e);
            throw e;
        }    }

    private CustomerResponseDTO getAllCustomerResponseDTO(Customer customer) {
        CustomerResponseDTO responseDTO = new CustomerResponseDTO();

        // Set worker details
        responseDTO.setId(customer.getId());
        responseDTO.setName(customer.getUsername()); // Assuming there's a 'name' field
//        responseDTO.setImageUrl(customer.getImageUrl());
//        responseDTO.setPrice(customer.getPrice()); // Assuming the Worker entity has a price field
//        responseDTO.setDescription(customer.getDescription()); // Assuming there's a description
        responseDTO.setEmail(customer.getEmail());
        responseDTO.setMobileNumber(customer.getMobileNumber());
        responseDTO.setCustomerRank(customer.getCustomerRank());
//        responseDTO.setWorkerType(customer.getWorkerType());
//        responseDTO.setWorkerType(customer.getWorkerType());


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
//        responseDTO.setImages(Collections.singletonList(customer.getImageUrl()));
        // Set additional attributes
//        responseDTO.setRating(customer.getRating()); // Assuming Worker has a rating field
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
