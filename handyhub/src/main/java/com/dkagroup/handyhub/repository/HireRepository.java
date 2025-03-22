package com.dkagroup.handyhub.repository;

import com.dkagroup.handyhub.entity.Hire;
import com.dkagroup.handyhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HireRepository extends JpaRepository<Hire, Long> {

}
