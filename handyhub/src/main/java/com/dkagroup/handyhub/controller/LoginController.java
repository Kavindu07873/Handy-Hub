package com.dkagroup.handyhub.controller;

import com.dkagroup.handyhub.dto.SignInDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/register")
public class LoginController {

    @RequestMapping("/")
    public String home() {
        return "Hello World";
    }

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity singInNewUser(@ModelAttribute SignInDTO signInDTO) {

        System.out.println("-----------------------------------------------------------------------");
        System.out.println("API called successfully");
        System.out.println("-----------------------------------------------------------------------");

        return new ResponseEntity<>("commonResponse", HttpStatus.OK);
    }
}
