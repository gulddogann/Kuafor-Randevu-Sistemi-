package com.example.randevusistemi.service;

import com.example.randevusistemi.entity.LoggedUser;
import com.example.randevusistemi.repository.LoggedUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoggedUserService {

    private final LoggedUserRepository loggedUserRepository;

    public LoggedUserService(LoggedUserRepository loggedUserRepository) {
        this.loggedUserRepository = loggedUserRepository;
    }

    public Long saveLoggedUser(String loggedUserEmail) {
        LoggedUser loggedUser = new LoggedUser();
        loggedUser.setLoggedUserEmail(loggedUserEmail);
        loggedUserRepository.save(loggedUser);
        return loggedUser.getId();
    }

    public List<LoggedUser> getAllLoggedUsers() {
        return loggedUserRepository.findAll();
    }

    public void deleteLoggedUserByEmail(String loggedUserEmail) {
        LoggedUser loggedUser = loggedUserRepository.findByLoggedUserEmail(loggedUserEmail);

        if (loggedUser != null) {
            loggedUserRepository.delete(loggedUser);
        }
    }
}
