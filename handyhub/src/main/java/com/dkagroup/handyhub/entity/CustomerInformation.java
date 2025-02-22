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
public class CustomerInformation {
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


    @OneToOne(cascade = CascadeType.ALL)
    private Customer customer;
}
