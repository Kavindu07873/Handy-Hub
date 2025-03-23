package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.constant.EmailTextConstant;
import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;
import com.dkagroup.handyhub.dto.Response.HireWorkeResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.dto.TaskStatusDTO;
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
import com.dkagroup.handyhub.utill.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class HireServiceImpl implements HireService {

    @Autowired
    AccessTokenValidator accessTokenValidator;

    @Value("${email.outgoing.recipient.email}")
    private String recipientEmail;

    @Autowired
    private EmailTextConstant emailTextConstant;

    @Autowired
    private EmailSender emailSender;
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

    @Override
    public List<HireWorkeResponseDTO> findAllTaskByWorker() {
        try {

            User user = accessTokenValidator.retrieveUserInformationFromAuthentication();

            System.out.println("user : " + user.getId());

            Worker worker = workerRepository.findByUserId(user.getId()).get();
            System.out.println("worker  : " + worker.getId());


            List<Hire> hireList = hireRepository.findAllByWorkerId(worker.getId());

            List<HireWorkeResponseDTO> hireWorkeResponseDTOList = new ArrayList<>();

            System.out.println("hireList : " + hireList.size());

            for (Hire hire : hireList) {
                HireWorkeResponseDTO hireWorkeResponseDTO = new HireWorkeResponseDTO();
                System.out.println("hire : " + hire.getId());
                hireWorkeResponseDTO.setId(hire.getId());
                hireWorkeResponseDTO.setPrice(String.valueOf(worker.getPrice()));
                hireWorkeResponseDTO.setDescription(hire.getDescription());
                hireWorkeResponseDTO.setAddress(hire.getAddress());
                hireWorkeResponseDTO.setCompletion("12000");
                hireWorkeResponseDTO.setStatus(hire.getTaskType());
                hireWorkeResponseDTO.setTitle("Office Renovation");
                hireWorkeResponseDTO.setDueDate(hire.getStartDate());
                hireWorkeResponseDTOList.add(hireWorkeResponseDTO);
            }

            return hireWorkeResponseDTOList;
        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in hireWorkerByCustomer: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging purposes
            throw e; // Re-throw the exception to propagate it
        }
    }

    @Override
    public void updateTaskStatus(long id, TaskStatusDTO taskStatusdto) {
        try {
            if (taskStatusdto.getStatus().equals(TaskType.APPROVED)) {
                hireRepository.findById(id).ifPresent(hire -> {
                    hire.setTaskType(TaskType.APPROVED);
                    hireRepository.save(hire);
                });
            } else {
                hireRepository.findById(id).ifPresent(hire -> {
                    hire.setTaskType(TaskType.REJECTED);
                    recipientEmail = hire.getCustomer().getEmail();
                    String content = emailTextConstant.emailContent();

                    emailSender.sendMail2(recipientEmail, null, "System Warning: Worker Rejected your task", content, null);
                    hireRepository.save(hire);
                });
                System.out.println(taskStatusdto.getStatus());
            }

        } catch (Exception e) {
            // Log the exception properly
            System.err.println("Error in updateTaskStatus: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging purposes
            throw e; // Re-throw the exception to propagate it
        }
    }
}
