package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.RegisterUserRequestDTO;

public interface UserService {

    void saveNewUser(RegisterUserRequestDTO registerUserRequestDTO);

}
