package com.dkagroup.handyhub.entity;

import com.dkagroup.handyhub.enums.UserRole;
import com.dkagroup.handyhub.enums.UserStatus;
import lombok.*;
import javax.persistence.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
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

    private String password;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Worker worker;

    public Long getId() { return id; }
//    public String getEmail() { return email; }
//    public String getUsername() { return username; }
//    public UserStatus getStatus() {return status;}
//    public String getPassword() {return password;}
//    public UserRole getUserRole() {return userRole;}

}
