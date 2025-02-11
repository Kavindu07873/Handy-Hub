package com.dkagroup.handyhub.configuration;


import com.dkagroup.handyhub.dto.UserDTO;
import com.dkagroup.handyhub.entity.UserEntity;
import com.dkagroup.handyhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class CustomTokenEnhancer extends JwtAccessTokenConverter {

//    private final AdminRepository adminRepo;
//    private final StaffRepository staffRepo;
    private final UserRepository userRepo;


    @Autowired
    public CustomTokenEnhancer( UserRepository userRepo) {
//        this.adminRepo = adminRepo;
//        this.staffRepo = staffRepo;
        this.userRepo = userRepo;
    }

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {

        final Map<String, Object> additionalInfo = new HashMap<>();

        User user = (User) oAuth2Authentication.getPrincipal();

//        Optional<AdminEntity> admin = adminRepo.findByEmail(user.getUsername());
//
//        if (admin.isPresent()) {
//            UserDTO build = UserDTO.builder()
//                    .id(admin.get().getId())
//                    .email(admin.get().getEmail())
//                    .username(admin.get().getName())
//                    .userRole(admin.get().getUserRole())
//                    .build();
//            additionalInfo.put("user", build);
//        }

        Optional<UserEntity> customer = userRepo.findByEmail(user.getUsername());
        if (customer.isPresent()) {
            System.out.println("customer : "+customer.get().getEmail());
            UserDTO userDTO = new UserDTO(
                    customer.get().getId(),
                    customer.get().getEmail(),
                    customer.get().getUsername(),
                    customer.get().getUserRole()
            );
            additionalInfo.put("user", userDTO);
        }

//        Optional<StaffEntity> staff = staffRepo.findByEmail(user.getUsername());
//
//        if (staff.isPresent()) {
//            UserDTO build = UserDTO.builder()
//                    .id(staff.get().getId())
//                    .email(staff.get().getEmail())
//                    .username(staff.get().getName())
//                    .userRole(staff.get().getUserRole())
//                    .build();
//            additionalInfo.put("user", build);
//        }

        // set custom claims
        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);
        System.out.println("super.enhance(oAuth2AccessToken, oAuth2Authentication) : "+super.enhance(oAuth2AccessToken, oAuth2Authentication));

        return super.enhance(oAuth2AccessToken, oAuth2Authentication);
    }
}
