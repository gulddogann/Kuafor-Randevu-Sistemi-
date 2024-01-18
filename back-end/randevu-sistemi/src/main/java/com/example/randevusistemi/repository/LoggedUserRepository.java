package com.example.randevusistemi.repository;

import com.example.randevusistemi.entity.LoggedUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggedUserRepository extends JpaRepository<LoggedUser, Long> {
    LoggedUser findByLoggedUserEmail(String loggedUserEmail);
}
