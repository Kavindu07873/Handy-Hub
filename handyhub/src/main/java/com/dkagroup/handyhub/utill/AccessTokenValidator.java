package com.dkagroup.handyhub.utill;

import com.dkagroup.handyhub.entity.User;
import com.dkagroup.handyhub.exception.HandyHubExceptionHandler;
import com.dkagroup.handyhub.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;

import static com.dkagroup.handyhub.constant.ApplicationConstant.*;
import static org.springframework.security.config.Elements.JWT;

@Slf4j
@Component
public class AccessTokenValidator {

//    @Autowired
//    private UserService userService;
    private final com.dkagroup.handyhub.service.UserService userService;

//    @Autowired
//    private VendorService vendorService;

    @Value("${staff-tenant-id}")
    private String tenantId;

    @Value("${staff-app-id}")
    private String appId;

    public AccessTokenValidator(com.dkagroup.handyhub.service.UserService userService) {
//        this.userService = userService;
//        this.vendorService = vendorService;
        this.userService = userService;
    }

//    public boolean validate(String token) {
//        try {
//            log.info("Execute method validate");
//
//            DecodedJWT jwt = JWT.decode(token);
//
//
//            JwkProvider provider = null;
//            Jwk jwk = null;
//            Algorithm algorithm = null;
//
//
//            provider = new UrlJwkProvider(new URL("https://login.microsoftonline.com/" + tenantId + "/discovery/v2.0/keys"));
//            jwk = provider.get(jwt.getKeyId());
//            algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);
//            algorithm.verify(jwt);// if the token signature is invalid, the method will throw SignatureVerificationException
//        } catch (Exception e) {
//
//            log.error("failed: " + e.getMessage());
//            return false;
//
//        }
//
//        return true;
//    }

//    public boolean checkIntended(String token) {
//        try {
//            log.info("Execute method checkIntended");
//
//            int i = token.lastIndexOf('.');
//            String withoutSignature = token.substring(0, i + 1);
//            Jwt<Header, Claims> untrusted = Jwts.parser().parseClaimsJwt(withoutSignature);
//
//            String aud = untrusted.getBody().get("aud", String.class);
//            Date expDate = untrusted.getBody().get("exp", Date.class);
//
//            if (!aud.equalsIgnoreCase(appId)) return false;
//            if (expDate.before(new Date())) return false;
//
//        } catch (Exception e) {
//            log.info(e.getMessage());
//            return false;
//        }
//        return true;
//    }

//    public Jwt<Header, Claims> getClaims(String token) {
//        try {
//            log.info("Execute method getClaims");
//
//            int i = token.lastIndexOf('.');
//            String withoutSignature = token.substring(0, i + 1);
//            Jwt<Header, Claims> untrusted = Jwts.parser().parseClaimsJwt(withoutSignature);
//            return untrusted;
//        } catch (Exception e) {
//            log.info(e.getMessage());
//        }
//        return null;
//    }

    public User retrieveUserInformationFromAuthentication() {
        log.info("Execute method retrieveUserInformationFromAuthentication");
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                User user = userService.getUserByEmail(authentication.getName());

                if (user == null) {
                    throw new HandyHubExceptionHandler(USER_NOT_FOUND, "this user is not registered yet");
                }
                return user;
            }
            throw new HandyHubExceptionHandler(RESOURCE_NOT_FOUND, "Can't find user details from token");
        } catch (Exception e) {
            log.error("Method retrieveB2BUserInformationFromAuthentication : " + e.getMessage());
            throw new HandyHubExceptionHandler(OPERATION_FAILED, e.getMessage());
        }
    }


//    public VendorEntity retrieveVendorInformationFromAuthentication(){
//        log.info("Execute method retrieveVendorInformationFromAuthentication");
//        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//            log.info("authentication : {}", authentication);
//            log.info("authentication.name : {}", authentication.getName());
//
//            if (!(authentication instanceof AnonymousAuthenticationToken)) {
////                VendorEntity vendor = vendorService.getVendorByNumber(authentication.getName());
//                log.info("authentication.getName() : {}", authentication.getName());
//
//                VendorEntity vendor = vendorService.getVendorById(authentication.getName());
//                if (vendor == null) {
//                    throw new LBCLServiceException(VENDOR_NOT_FOUND, "this vendor is not registered yet");
//                }
//                log.info("vendor : {}", vendor.getId());
//
//                return vendor;
//            }
//            throw new LBCLServiceException(RESOURCE_NOT_FOUND, "Can't find vendor details from token");
//        } catch (Exception e) {
//            log.error("Method retrieveB2BVendorInformationFromAuthentication : {}", e.getMessage());
//            throw new LBCLServiceException(OPERATION_FAILED, e.getMessage());
//        }
//    }


    public boolean isAuthenticated() {
        log.info("Execute method isAuthenticated");
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            log.info("isAuthenticated " + authentication.isAuthenticated());
            if (!(authentication instanceof AnonymousAuthenticationToken)) {
                log.info("isAuthenticated : instance of AnonymousAuthenticationToken");
                log.info("isAuthenticated : email : " + authentication.getName());
                User user = userService.getUserByEmail(authentication.getName());
                log.info("isAuthenticated : user : " + (user!=null));
                return user != null;
            }
            return false;
        } catch (Exception e) {
            log.error("Method isAuthenticated : " + e.getMessage());
            throw new HandyHubExceptionHandler(OPERATION_FAILED, e.getMessage());
        }
    }

}
