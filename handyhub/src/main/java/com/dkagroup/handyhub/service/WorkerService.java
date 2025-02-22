package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.Response.WorkerResponseDTO;
import org.springframework.data.domain.Page;

public interface WorkerService {
    Page<WorkerResponseDTO> getAllWorkerListWithPagination(String category, String search, Integer page, Integer size);
}
