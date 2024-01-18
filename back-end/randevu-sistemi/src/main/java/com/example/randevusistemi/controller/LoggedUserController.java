package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.LoggedUser;
import com.example.randevusistemi.service.LoggedUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loggedusers")
public class LoggedUserController {

    private final LoggedUserService loggedUserService;

    public LoggedUserController(LoggedUserService loggedUserService) {
        this.loggedUserService = loggedUserService;
    }

    @GetMapping("/all")
    public List<LoggedUser> getAllLoggedUsers() {
        return loggedUserService.getAllLoggedUsers();
    }

    @PostMapping("/save")
    public ResponseEntity<Long> saveLoggedUser(@RequestParam("loggedUserEmail") String loggedUserEmail) {
        Long userId = loggedUserService.saveLoggedUser(loggedUserEmail);
        return ResponseEntity.ok(userId);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLoggedUser(@RequestParam("loggedUserEmail") String loggedUserEmail) {
        loggedUserService.deleteLoggedUserByEmail(loggedUserEmail);
        return ResponseEntity.ok("Logged User başarıyla silindi!");
    }
}
