package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.LoggedUser;
import com.example.randevusistemi.entity.User;
import com.example.randevusistemi.service.LoggedUserService;
import com.example.randevusistemi.service.RandevuService;
import com.example.randevusistemi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam("userEmail") String userEmail,
            @RequestParam("userPassword") String userPassword) {

        User user = userService.findByUserEmail(userEmail);

        if (user != null && userService.checkPassword(user, userPassword)) {
            user.setLoggedEmail(userEmail);
            userService.saveUser(user);
            userService.login(user);
            return ResponseEntity.ok("Giriş Başarılı!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı adı veya şifre hatalı");
        }
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String userEmail) {

        User user = userService.findByUserEmail(userEmail);

        if (user != null && user.getUserEmail() != null) {
            user.setLoggedIn(false);
            user.setLoggedEmail(null);
            userService.saveUser(user);
            return "Çıkış işlemi başarılı.";
        } else {
            return "Kullanıcı bulunamadı veya zaten çıkış yapılmış.";
        }
    }

}