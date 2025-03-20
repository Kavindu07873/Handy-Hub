package com.dkagroup.handyhub.controller;

import com.dkagroup.handyhub.dto.Request.CustomerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;
import com.dkagroup.handyhub.dto.Response.CustomerResponseDTO;
import com.dkagroup.handyhub.dto.common.CommonResponseDTO;
import com.dkagroup.handyhub.enums.UserStatus;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.dkagroup.handyhub.constant.ResponseMessages.SUCCESS_RESPONSE;

@Log4j2
@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {

    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllWorkers() {
        System.out.println(":hello world ");

// Assuming CustomerResponseDTO is a class with appropriate fields and setters/getters
        CustomerResponseDTO customerResponseDTO = new CustomerResponseDTO();
// Set the fields using the setter methods
        customerResponseDTO.setImage("https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg");
        customerResponseDTO.setName("John Doe");
        customerResponseDTO.setEmail("john.doe@example.com");
        customerResponseDTO.setRole("Admin");
        customerResponseDTO.setStatus(UserStatus.ACTIVE);
        customerResponseDTO.setCompany("Tech Corp");
        customerResponseDTO.setPhone("+1 (555) 123-4567");
        customerResponseDTO.setAddress("123 Main St, New York, NY");
        customerResponseDTO.setTimezone("GMT-05:00");
// If you want to print or use the object
        System.out.println(customerResponseDTO);
        return new ResponseEntity<>(new CommonResponseDTO(true, customerResponseDTO, SUCCESS_RESPONSE), HttpStatus.OK);
    }


    @PostMapping(value = "/profile/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity hireWorker(@RequestBody CustomerUpdateRequestDTO customerUpdateRequestDTO) {
        System.out.println("Customer Successfully update");

        System.out.println("hireDataRequestDTO : " + customerUpdateRequestDTO.getAddress());
        System.out.println("hireDataRequestDTO : " + customerUpdateRequestDTO.getName());

        return new ResponseEntity<>(new CommonResponseDTO(true, "Customer Successfully update"), HttpStatus.OK);
    }


}
