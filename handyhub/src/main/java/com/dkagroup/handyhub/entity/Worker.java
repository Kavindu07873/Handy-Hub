package com.dkagroup.handyhub.entity;

import com.dkagroup.handyhub.enums.*;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "worker")
public class Worker {
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

    private String imageUrl;

    private String description;
    private String address;
    private String company;
    private String education;

    private double price;

    private double rating;
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private WorkerType workerType;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private WorkerRank workerRank;

    @OneToOne(mappedBy = "worker", cascade = CascadeType.ALL)
    private WorkerInformation workerInformation;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToMany(mappedBy = "worker" , cascade = CascadeType.ALL ,fetch = FetchType.LAZY)
    private List<Hire> hires;
}
