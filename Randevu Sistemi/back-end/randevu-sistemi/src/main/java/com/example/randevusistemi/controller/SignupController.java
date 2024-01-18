package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.User;
import com.example.randevusistemi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/signup")
public class SignupController {

    private final UserService userService;

    public SignupController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByUserEmail(user.getUserEmail()) == null) {
            if (user.isKuafor()) {
                user.setKuafor(true);
                userService.registerUser(user);
                return ResponseEntity.status(HttpStatus.CREATED).body("Kuafor basariyla kaydedildi.");
            } else {
                user.setMusteri(true);
                userService.registerUser(user);
                return ResponseEntity.status(HttpStatus.CREATED).body("Musteri basariyla kaydedildi.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Bu e-posta adresi zaten kullaniliyor.");
        }
    }
}