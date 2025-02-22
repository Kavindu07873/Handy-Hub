package com.dkagroup.handyhub.repository;

import com.dkagroup.handyhub.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<Worker, Long> {
}
