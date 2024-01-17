package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.User;
import com.example.randevusistemi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/loggedEmail")
    public ResponseEntity<String> getLoggedEmailByEmail(@RequestParam("userEmail") String userEmail){
        User user = userService.findByUserEmail(userEmail);
        if (user == null || user.getLoggedEmail() == null) {
            return ResponseEntity.ok("");
        }else{
            return ResponseEntity.ok(user.getLoggedEmail());
        }
    }

    @GetMapping("/userType")
    public ResponseEntity<String> getUserTypeByEmail(@RequestParam("userEmail") String userEmail) {
        User user = userService.findByUserEmail(userEmail);

        if (user != null) {
            boolean isMusteri = user.isMusteri();
            boolean isKuafor = user.isKuafor();
            boolean isAdmin = user.isAdmin();

            if (!isMusteri && !isKuafor && isAdmin) {
                return ResponseEntity.ok("Admin");
            } else if (!isMusteri && isKuafor && !isAdmin) {
                return ResponseEntity.ok("Kuafor");
            } else if (isMusteri && !isKuafor && !isAdmin) {
                return ResponseEntity.ok("Musteri");
            } else {
                return ResponseEntity.badRequest().body("Kullanıcı türü belirlenemiyor. isMusteri: " + isMusteri + " isKuafor: " + isKuafor + " isAdmin: " + isAdmin);
            }
        } else {
            return ResponseEntity.badRequest().body("Kullanıcı bulunamadı.");
        }
    }


    @PostMapping("/duzenle")
    public ResponseEntity<String> updateUserTypeByEmail(@RequestBody User user) {
        try {
            User existingUser = userService.findByUserEmail(user.getUserEmail());
            System.out.println("deneme-1");
            if (existingUser != null) {
                System.out.println("deneme-2");
                if (user.isKuafor()) {
                    System.out.println("deneme-3");
                    existingUser.setUserAd(user.getUserAd());
                    existingUser.setUserSoyad(user.getUserSoyad());
                    existingUser.setUserEmail(user.getUserEmail());
                    existingUser.setUserPassword(user.getUserPassword());
                } else if(user.isMusteri()){
                    System.out.println("is musteri");
                }
                else {
                    System.out.println("deneme4");
                    existingUser.setMusteri(false);
                    existingUser.setKuafor(true);
                }
                System.out.println("deneme-5");
                userService.registerUser(existingUser);
                return ResponseEntity.ok("Kuafor başarıyla düzenlendi.");
            } else {
                System.out.println("deneme-6");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println("deneme-7");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Düzenleme işlemi sırasında bir hata oluştu.");
        }
    }




    @DeleteMapping("/sil")
    public ResponseEntity<String> deleteUserByEmail(@RequestParam("userEmail") String userEmail) {
        try {
            User existingUser = userService.findByUserEmail(userEmail);

            if (existingUser != null) {
                userService.deleteUserById(existingUser.getId()); // Veya kendi silme metodu kullanmanız gerekebilir.
                return ResponseEntity.ok("Kuafor başarıyla silindi.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Silme işlemi sırasında bir hata oluştu.");
        }
    }


}
