package com.dkagroup.handyhub.controller;

import com.dkagroup.handyhub.dto.RegisterUserRequestDTO;
import com.dkagroup.handyhub.dto.common.CommonResponseDTO;
import com.dkagroup.handyhub.service.Oauth2UserService;
import com.dkagroup.handyhub.service.UserService;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Log4j2
@RestController
@CrossOrigin
@RequestMapping("/user")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity registerNewUser(@RequestBody RegisterUserRequestDTO registerRequest) {

            System.out.println("Test 1");
            userService.saveNewUser(registerRequest);
            System.out.println("Test 2");
            return new ResponseEntity<>(new CommonResponseDTO(true, "Customer Successfully Registered"), HttpStatus.OK);
    }

}
