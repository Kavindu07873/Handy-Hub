package com.dkagroup.handyhub.repository;

import com.dkagroup.handyhub.entity.Hire;
import com.dkagroup.handyhub.entity.User;
import org.jboss.logging.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HireRepository extends JpaRepository<Hire, Long> {


    @Query(value = "SELECT * FROM hire h WHERE h.fk_worker_id = ?1 AND h.task_type <> 'REJECTED'", nativeQuery = true)
    List<Hire> findAllByWorkerId(long id);


}
