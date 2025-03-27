package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.Request.CustomerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Response.CustomerResponseDTO;
import org.springframework.data.domain.Page;

public interface CustomerService {
    CustomerResponseDTO getCustomerProfile();

    void updateCustomerProfile(CustomerUpdateRequestDTO customerUpdateRequestDTO);

    Page<CustomerResponseDTO> getAllCustomerListWithPagination(Integer page, Integer size);
}
