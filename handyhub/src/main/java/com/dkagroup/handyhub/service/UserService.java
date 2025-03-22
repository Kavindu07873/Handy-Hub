package com.dkagroup.handyhub.service;

import com.dkagroup.handyhub.dto.RegisterUserRequestDTO;
import com.dkagroup.handyhub.entity.User;

public interface UserService {

    void saveNewUser(RegisterUserRequestDTO registerUserRequestDTO);

    User getUserByEmail(String name);
}
