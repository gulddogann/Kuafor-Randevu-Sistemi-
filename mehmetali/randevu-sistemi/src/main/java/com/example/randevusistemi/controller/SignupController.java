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
        // E-posta adresinin benzersiz olup olmadığını kontrol et
        if (userService.findByUserEmail(user.getUserEmail()) == null) {
            // Eğer e-posta adresi benzersizse kaydet
            if (user.isKuafor()) {
                // Eğer kullanıcı bir kuaför ise
                user.setKuafor(true); // Kuafor true yap
                userService.registerUser(user);
                return ResponseEntity.status(HttpStatus.CREATED).body("Kuafor basariyla kaydedildi.");
            } else {
                // Eğer kullanıcı bir müşteri ise
                user.setMusteri(true); // Musteri true yap
                userService.registerUser(user);
                return ResponseEntity.status(HttpStatus.CREATED).body("Musteri basariyla kaydedildi.");
            }
        } else {
            // Eğer e-posta adresi daha önceden kullanılmışsa hata mesajı döndür
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Bu e-posta adresi zaten kullaniliyor.");
        }
    }
}