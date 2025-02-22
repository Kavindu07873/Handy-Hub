package com.dkagroup.handyhub.configuration;


import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

//        final Map<String, Object> additionalInfo = new HashMap<>();
//
//        User user = (User) oAuth2Authentication.getPrincipal();
//
////        Optional<AdminEntity> admin = adminRepo.findByEmail(user.getUsername());
////
////        if (admin.isPresent()) {
////            UserDTO build = UserDTO.builder()
////                    .id(admin.get().getId())
////                    .email(admin.get().getEmail())
////                    .username(admin.get().getName())
////                    .userRole(admin.get().getUserRole())
////                    .build();
////            additionalInfo.put("user", build);
////        }
//
//        Optional<User> customer = userRepo.findByEmail(user.getUsername());
//        if (customer.isPresent()) {
//            System.out.println("customer : "+customer.get().getEmail());
//            UserDTO userDTO = new UserDTO(
//                    customer.get().getId(),
//                    customer.get().getEmail(),
//                    customer.get().getUsername(),
//                    customer.get().getUserRole()
//            );
//            additionalInfo.put("user", userDTO);
//            System.out.println("Adding userDTO to additionalInfo: " + userDTO);
//
//            Map<String, Object> userInfo = new HashMap<>();
//            userInfo.put("id", customer.get().getId());
//            userInfo.put("email", customer.get().getEmail());
//            userInfo.put("username", customer.get().getUsername());
//            userInfo.put("userRole", customer.get().getUserRole().name());  // Convert enum to string
//            additionalInfo.put("user", userInfo);
//        }
//
//
//        // Ensure that you log the additionalInfo map before returning
//        System.out.println("Enhancing token with additionalInfo: " + additionalInfo);
//
//        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);
////        System.out.println("super.enhance(oAuth2AccessToken, oAuth2Authentication) : "+super.enhance(oAuth2AccessToken, oAuth2Authentication));
//
//        return super.enhance(oAuth2AccessToken, oAuth2Authentication);

        final Map<String, Object> additionalInfo = new HashMap<>();
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) oAuth2Authentication.getPrincipal();

        Optional<User> customer = userRepo.findByEmail(user.getUsername());
        if (customer.isPresent()) {
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", customer.get().getId());
            userInfo.put("email", customer.get().getEmail());
            userInfo.put("username", customer.get().getUsername());
            userInfo.put("userRole", customer.get().getUserRole().name());
            additionalInfo.put("user", userInfo);
        }

        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);
        return super.enhance(oAuth2AccessToken, oAuth2Authentication);
    }
}
