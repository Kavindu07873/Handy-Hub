package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.entity.Customer;
import com.dkagroup.handyhub.entity.Hire;
import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.enums.TaskType;
import com.dkagroup.handyhub.repository.CustomerRepository;
import com.dkagroup.handyhub.repository.HireRepository;
import com.dkagroup.handyhub.repository.WorkerRepository;
import com.dkagroup.handyhub.service.HireService;
import com.dkagroup.handyhub.service.UserService;
import com.dkagroup.handyhub.utill.AccessTokenValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.Optional;

@Service
public class HireServiceImpl implements HireService {

    @Autowired
    AccessTokenValidator accessTokenValidator;
    private final WorkerRepository workerRepository;
    private final CustomerRepository customerRepository;
    private final HireRepository hireRepository;

    public HireServiceImpl(WorkerRepository workerRepository, CustomerRepository customerRepository, HireRepository hireRepository) {
        this.workerRepository = workerRepository;
        this.customerRepository = customerRepository;
        this.hireRepository = hireRepository;
    }


    @Override
    public void hireWorkerByCustomer(HireDataRequestDTO hireDataRequestDTO) {
        try {
            User user = accessTokenValidator.retrieveUserInformationFromAuthentication();
            Customer customer = customerRepository.findByUserId(user.getId());
            Worker worker = workerRepository.findById(hireDataRequestDTO.getWorkerId()).get();

            Hire hire = new Hire();
            hire.setWorker(worker); // Assuming 'worker' is already fetched from DB
            hire.setCustomer(customer); // Assuming 'customer' is already fetched from DB
            hire.setAddress(hireDataRequestDTO.getAddress());
            hire.setDescription(hireDataRequestDTO.getDescription());
            hire.setLocation(hireDataRequestDTO.getLocation());
            hire.setComment(hireDataRequestDTO.getComment());
            hire.setPeoplesQuantity(hireDataRequestDTO.getPeoplesQuantity());
            hire.setTaskType(TaskType.PENDING);
            hire.setStartDate(hireDataRequestDTO.getDateRange().get(0));
            hire.setEndDate(hireDataRequestDTO.getDateRange().get(1));
            hire.setPeoplesQuantity(hireDataRequestDTO.getQuantity());
// Save the hire entity
            hireRepository.save(hire);
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in hireWorkerByCustomer: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging purposes
            throw e; // Re-throw the exception to propagate it
        }
    }
}
