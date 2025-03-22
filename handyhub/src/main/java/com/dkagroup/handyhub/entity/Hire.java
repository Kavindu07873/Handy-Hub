package com.dkagroup.handyhub.entity;

import com.dkagroup.handyhub.enums.Gender;
import com.dkagroup.handyhub.enums.TaskType;
import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hire")
public class Hire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String description;

    private String location;

    private String address;

    private String  comment;
    private int peoplesQuantity;
    private String startDate;
    private String endDate;

    @Enumerated(EnumType.STRING)
    private TaskType taskType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_customer_id")
    private Customer customer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_worker_id")
    private Worker worker;
}
