package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.Request.CustomerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Response.CustomerResponseDTO;
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
import org.springframework.stereotype.Service;

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

}
