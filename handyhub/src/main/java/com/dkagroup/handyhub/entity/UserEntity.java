package com.dkagroup.handyhub.entity;

import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import lombok.*;
import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length = 255)
    private String username;
    @Column(length = 255)
    private String lastName;
    @Column(length = 255, unique = true, nullable = false)
    private String email;
    @Column(length = 255)
    private String mobileNumber;
    @Column(length = 255, nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public UserStatus getStatus() {return status;}
    public String getPassword() {return password;}
    public UserRole getUserRole() {return userRole;}

}
