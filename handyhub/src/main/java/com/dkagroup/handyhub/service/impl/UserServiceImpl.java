package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.RegisterUserRequestDTO;
import com.dkagroup.handyhub.entity.Customer;
import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.enums.*;
import com.dkagroup.handyhub.exception.HandyHubExceptionHandler;
import com.dkagroup.handyhub.repository.CustomerRepository;
import com.dkagroup.handyhub.repository.UserRepository;
import com.dkagroup.handyhub.repository.WorkerRepository;
import com.dkagroup.handyhub.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.dkagroup.handyhub.constant.ApplicationConstant.*;

@Service
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, CustomerRepository customerRepository, WorkerRepository workerRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.workerRepository = workerRepository;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void saveNewUser(RegisterUserRequestDTO registerUserRequestDTO) {
        try {
            System.out.println("registerUserRequestDTO");
            System.out.println(registerUserRequestDTO.getEmail());
            System.out.println(registerUserRequestDTO.getUsername());
            System.out.println(registerUserRequestDTO.getPassword());
            Optional<User> existingUser = userRepository.findByEmail(registerUserRequestDTO.getEmail());
            existingUser.ifPresent(user -> {
                throw new HandyHubExceptionHandler(DUPLICATE_ENTRY, "Sorry, the user already exists.");
            });
            User user = new User();
            user.setEmail(registerUserRequestDTO.getEmail());
            user.setUsername(registerUserRequestDTO.getUsername());
            System.out.println(passwordEncoder.encode(registerUserRequestDTO.getPassword()));

            user.setPassword(passwordEncoder.encode(registerUserRequestDTO.getPassword()));

            user.setUserRole(registerUserRequestDTO.getRole());
            user.setStatus(UserStatus.DEFAULT);
            user = userRepository.save(user);
            if (registerUserRequestDTO.getRole().equals(UserRole.CUSTOMER)) {
                System.out.println(registerUserRequestDTO.getRole());
                Customer customer = new Customer();
                customer.setUser(user);
                customer.setEmail(registerUserRequestDTO.getEmail());
                customer.setUsername(registerUserRequestDTO.getUsername());
                customer.setUserRole(registerUserRequestDTO.getRole());
                customer.setStatus(UserStatus.DEFAULT);
                customer.setCustomerRank(CustomerRank.NEWBIE);
                customerRepository.save(customer);
            } else if (registerUserRequestDTO.getRole().equals(UserRole.WORKER)) {
                System.out.println(registerUserRequestDTO.getRole());
                Worker worker = new Worker();
                worker.setEmail(registerUserRequestDTO.getEmail());
                worker.setUsername(registerUserRequestDTO.getUsername());
                worker.setUser(user);
                worker.setUserRole(registerUserRequestDTO.getRole());
                worker.setWorkerType(WorkerType.TRAINEE);
                worker.setStatus(UserStatus.DEFAULT);
                worker.setWorkerRank(WorkerRank.JUNIOR);
                worker.setGender(registerUserRequestDTO.getGender());
                workerRepository.save(worker);
            } else {
                System.out.println(registerUserRequestDTO.getRole());

            }

        } catch (Exception e) {
            System.out.println("Function saveUserAndGetAccessToken : {}" + e.getMessage());
            throw e;
        }
    }

    @Override
    public User getUserByEmail(String name) {
        log.info("Execute method getUserByEmail : {}", name);
        try {
            Optional<User> userEntityOptional = userRepository.findByEmail(name);
            return userEntityOptional.orElse(null);
        } catch (Exception e) {
            log.error("getUserByEmail : {}", e.getMessage(), e);
            throw e;
        }    }
}
