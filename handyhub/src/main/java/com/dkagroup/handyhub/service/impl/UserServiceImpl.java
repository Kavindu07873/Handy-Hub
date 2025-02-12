package com.dkagroup.handyhub.service.impl;

import com.dkagroup.handyhub.entity.UserEntity;
import com.dkagroup.handyhub.enums.UserStatus;
import com.dkagroup.handyhub.exception.CustomOauthException;
import com.dkagroup.handyhub.exception.HandyHubExceptionHandler;
import com.dkagroup.handyhub.repository.UserRepository;
import com.dkagroup.handyhub.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.dkagroup.handyhub.constant.ApplicationConstant.USER_NOT_FOUND;

@Service(value = "userService")
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserServiceImpl implements UserService , UserDetailsService {
    private final UserRepository userRepository;
//    private final ModelMapper modelMapper;
//    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    @Override
//    public UserDetails getUserDetailsForLogin(String email) {
//        log.info("Start function getUserDetailsForLogin @param email : {}", email);
//        try {
//            Optional<UserEntity> customer = userRepository.findByEmail(email);
//            System.out.println("1");
//            if (customer.isPresent() && customer.get().getStatus().equals(UserStatus.ACTIVE)) {
//                System.out.println("2");
//                return new org.springframework.security.core.userdetails.User(
//                        customer.get().getEmail(), customer.get().getPassword(),
//                        getAuthority(customer.get().getUserRole().name()));
//            }
//            System.out.println("3");
//            throw new CustomOauthException("Invalid Credentials  I dont know .");
//        } catch (Exception e) {
//            log.error("Function getUserDetailsForLogin : {}", e.getMessage(), e);
////            throw new ExecutionControl.UserException(COMMON_ERROR_CODE, e.getMessage());
//        }
//        return null;
//    }

    private List<SimpleGrantedAuthority> getAuthority(String roleName) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roleName));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        System.out.println("Start function getUserDetailsForLogin @param email : {}"+ username);
        try {
            Optional<UserEntity> customer = userRepository.findByEmail(username);
            System.out.println("1");
            if (customer.isPresent() && customer.get().getStatus().equals(UserStatus.ACTIVE)) {
                System.out.println("2");
                System.out.println("customer.get().getEmail(), customer.get().getPassword() : "+customer.get().getEmail()  +" "+  customer.get().getPassword());
                System.out.println("getAuthority(customer.get().getUserRole().name()) : "+ customer.get().getUserRole());
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                String encodedPassword = encoder.encode("nd2TY4pVvxV2GEvckHsiuPN5dDF3");
                System.out.println(encodedPassword);

                return new org.springframework.security.core.userdetails.User(
                        customer.get().getEmail(), customer.get().getPassword(),
                        getAuthority(customer.get().getUserRole().name()));
            }
            System.out.println("3");
            throw new CustomOauthException("Invalid Credentials  I dont know .");
        } catch (Exception e) {
            throw e;
//            log.error("Function getUserDetailsForLogin : {}", e.getMessage(), e);
//            throw new ExecutionControl.UserException(COMMON_ERROR_CODE, e.getMessage());
        }
    }
}
