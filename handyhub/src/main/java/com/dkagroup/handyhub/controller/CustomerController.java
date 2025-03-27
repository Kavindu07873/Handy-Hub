package com.dkagroup.handyhub.controller;

import com.dkagroup.handyhub.dto.Request.CustomerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;
import com.dkagroup.handyhub.dto.Response.CustomerCountResponseDTO;
import com.dkagroup.handyhub.dto.Response.CustomerResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerCountResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.dto.common.CommonResponseDTO;
import com.dkagroup.handyhub.enums.UserStatus;
import com.dkagroup.handyhub.service.CustomerService;
import com.dkagroup.handyhub.service.HireService;
import com.dkagroup.handyhub.service.WorkerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    private final WorkerService workerService;
    @Autowired
    private final HireService hireService;


    @Autowired
    private final CustomerService customerService;


    public CustomerController(WorkerService workerService, HireService hireService, CustomerService customerService) {
        this.workerService = workerService;
        this.hireService = hireService;
        this.customerService = customerService;
    }


    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getCustomersProfile() {
        System.out.println(":hello world ");

        CustomerResponseDTO customerResponseDTO = customerService.getCustomerProfile();

        return new ResponseEntity<>(new CommonResponseDTO(true, customerResponseDTO, SUCCESS_RESPONSE), HttpStatus.OK);
    }


    @PostMapping(value = "/profile/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity hireWorker(@RequestBody CustomerUpdateRequestDTO customerUpdateRequestDTO) {
        System.out.println("Customer Successfully update");

//        System.out.println("hireDataRequestDTO : " + customerUpdateRequestDTO.getAddress());
//        System.out.println("hireDataRequestDTO : " + customerUpdateRequestDTO.getName());
        customerService.updateCustomerProfile(customerUpdateRequestDTO);


        return new ResponseEntity<>(new CommonResponseDTO(true, "Customer Successfully update"), HttpStatus.OK);
    }


    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllWorkers(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {

        if (page == 1) {
            page = 0;
        }
        System.out.println(":hello world ");

        Page<CustomerResponseDTO> allCustomers = customerService.getAllCustomerListWithPagination( page, size);
        return new ResponseEntity<>(new CommonResponseDTO(true, allCustomers, SUCCESS_RESPONSE), HttpStatus.OK);
    }



    @GetMapping(value = "/customerCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllCustomerCount() {
        System.out.println(":hello getAllTask ");

        CustomerCountResponseDTO customerCountResponseDTO = hireService.findAllCustomerCount();
        return new ResponseEntity<>(new CommonResponseDTO(true, customerCountResponseDTO, SUCCESS_RESPONSE), HttpStatus.OK);
    }
}
