package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.RegisterUserRequestDTO;
import com.dkagroup.handyhub.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserServiceImpl implements UserService {


    @Override
    public void saveNewUser(RegisterUserRequestDTO registerUserRequestDTO) {
        try {
            System.out.println("registerUserRequestDTO");
            System.out.println(registerUserRequestDTO.getEmail());
            System.out.println(registerUserRequestDTO.getUsername());
            System.out.println(registerUserRequestDTO.getRole());
            System.out.println(registerUserRequestDTO.getPassword());

        } catch (Exception e) {
            System.out.println("Function saveUserAndGetAccessToken : {}"+ e.getMessage());
            throw e;
        }
    }
}
