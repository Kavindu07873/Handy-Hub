package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.Request.CustomerUpdateRequestDTO;
import com.dkagroup.handyhub.dto.Response.CustomerResponseDTO;

public interface CustomerService {
    CustomerResponseDTO getCustomerProfile();

    void updateCustomerProfile(CustomerUpdateRequestDTO customerUpdateRequestDTO);
}
