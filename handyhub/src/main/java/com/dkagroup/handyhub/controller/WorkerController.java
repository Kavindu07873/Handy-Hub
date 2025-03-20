package com.dkagroup.handyhub.controller;

import com.dkagroup.handyhub.dto.Response.HeaderResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerInformationResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.dto.common.CommonResponseDTO;
import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;

import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.enums.*;
import com.dkagroup.handyhub.service.WorkerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

import static com.dkagroup.handyhub.constant.ApplicationConstant.OPERATION_SUCCESS;
import static com.dkagroup.handyhub.constant.ResponseMessages.SUCCESS_RESPONSE;

@Log4j2
@RestController
@CrossOrigin
@RequestMapping("/worker")
public class WorkerController {

    @Autowired
    private final WorkerService workerService;


    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllWorkers(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {

        if (page == 1) {
            page = 0;
        }
        System.out.println(":hello world ");

        Page<WorkerResponseDTO> allBatches = workerService.getAllWorkerListWithPagination(category, search, page, size);
        return new ResponseEntity<>(new CommonResponseDTO(true, allBatches, SUCCESS_RESPONSE), HttpStatus.OK);
    }

    @GetMapping(value = "/header", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllWorkersHeaderData() {

        System.out.println(":hello world header ");

        HeaderResponseDTO hdr = new HeaderResponseDTO();
        hdr.setSortBy("Lowest");
        hdr.setTotalProducts("10");
//        Page<WorkerResponseDTO> allBatches = workerService.getAllWorkerListWithPagination(category,search,page,size);
        return new ResponseEntity<>(new CommonResponseDTO(true, hdr, SUCCESS_RESPONSE), HttpStatus.OK);
    }

    @GetMapping(value = "/details/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllDetailsOfTheWorker(@PathVariable long id) {

        System.out.println(":hello getAllDetailsOfTheWorker ");

        WorkerResponseDTO workerData = workerService.getAllWorkerDetails(id);
        return new ResponseEntity<>(new CommonResponseDTO(true, workerData, SUCCESS_RESPONSE), HttpStatus.OK);
    }

    @PostMapping(value = "/hire", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity hireWorker(@RequestBody HireDataRequestDTO hireDataRequestDTO) {
        System.out.println(":hello hireWorker ");

        System.out.println("hireDataRequestDTO : "+hireDataRequestDTO.getDateRange().size());
        System.out.println("hireDataRequestDTO : "+hireDataRequestDTO.getDescription());

        return new ResponseEntity<>(new CommonResponseDTO(true, "Worker Successfully register"), HttpStatus.OK);
    }

    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllDetailsOfTheWorkerProfile() {

        System.out.println(":hello getAllDetailsOfTheWorker ");

        WorkerInformationResponseDTO workerInfo = workerService.getWorkerdetails();
        return new ResponseEntity<>(new CommonResponseDTO(true, workerInfo, SUCCESS_RESPONSE), HttpStatus.OK);
    }

}
