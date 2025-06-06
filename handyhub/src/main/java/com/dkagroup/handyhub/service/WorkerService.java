package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.Request.WorkerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Response.WorkerInformationResponseDTO;
import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import org.springframework.data.domain.Page;

public interface WorkerService {
    Page<WorkerResponseDTO> getAllWorkerListWithPagination(String category, String search, Integer page, Integer size);


    WorkerResponseDTO getAllWorkerDetails(long id);

    WorkerInformationResponseDTO getWorkerdetails();

    WorkerInformationResponseDTO getWorkerdetailsById(long id);

    void updateWorkerProfile(WorkerUpdateRequestDTO workerUpdateRequestDTO);
}
