package com.dkagroup.handyhub.controller;

import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;
import com.dkagroup.handyhub.dto.common.CommonResponseDTO;
import com.dkagroup.handyhub.service.HireService;
import com.dkagroup.handyhub.service.WorkerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@CrossOrigin
@RequestMapping("/work")
public class HireController {

    @Autowired
    private final HireService hireService;

    public HireController(HireService hireService) {
        this.hireService = hireService;
    }


    @PostMapping(value = "/hire", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity hireWorker(@RequestBody HireDataRequestDTO hireDataRequestDTO) {
        System.out.println(":hello hireWorker ");

        System.out.println("hireDataRequestDTO : "+hireDataRequestDTO.getDateRange().size());
        System.out.println("hireDataRequestDTO : "+hireDataRequestDTO.getDescription());
        hireService.hireWorkerByCustomer(hireDataRequestDTO);
        return new ResponseEntity<>(new CommonResponseDTO(true, "Worker Successfully hired"), HttpStatus.OK);
    }
}
