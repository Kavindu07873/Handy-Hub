package com.dkagroup.handyhub.repository;

import com.dkagroup.handyhub.entity.Customer;
import com.dkagroup.handyhub.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByUserId(Long id);
}
