package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.Request.HireDataRequestDTO;
import com.dkagroup.handyhub.dto.Response.HireWorkeResponseDTO;
import com.dkagroup.handyhub.dto.TaskStatusDTO;

import java.util.List;

public interface HireService {
    void hireWorkerByCustomer(HireDataRequestDTO hireDataRequestDTO);

    List<HireWorkeResponseDTO> findAllTaskByWorker();

    void updateTaskStatus(long id, TaskStatusDTO taskStatusdto);
}
