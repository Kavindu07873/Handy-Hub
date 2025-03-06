package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import com.dkagroup.handyhub.entity.Worker;
import com.dkagroup.handyhub.repository.WorkerRepository;
import com.dkagroup.handyhub.service.WorkerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class WorkerServiceImpl implements WorkerService {

    private final WorkerRepository workerRepository;

    public WorkerServiceImpl(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }


    @Override
    public Page<WorkerResponseDTO> getAllWorkerListWithPagination(String category, String search, Integer page, Integer size) {
        try {
            System.out.println("Execute method getAllWorkerListWithPagination ");
            Page<WorkerResponseDTO> responseDTOS = null;
            Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 10);

            Page<Worker> workerPage = workerRepository.findAll(pageable);

            responseDTOS = workerPage.map(this::getAllWorkersResponseDTO);
//            return workerPage.stream().map(WorkerResponseDTO::worker).toList();
            return responseDTOS;
        } catch (Exception e) {
            System.out.println("Method getAllBatches : " + e.getMessage() + " " + e);
            throw e;
        }
    }

    public WorkerResponseDTO getAllWorkersResponseDTO(Worker workerPage) {
        WorkerResponseDTO responseDTO = new WorkerResponseDTO();
        responseDTO.setId(workerPage.getId());
        responseDTO.setName(workerPage.getUsername());
        responseDTO.setImageUrl(workerPage.getImageUrl());
        responseDTO.setId(workerPage.getId());
        responseDTO.setPrice(1500.00);
        return responseDTO;
    }
}
