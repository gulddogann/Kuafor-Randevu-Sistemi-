package com.example.randevusistemi.service;

import com.example.randevusistemi.entity.User;
import com.example.randevusistemi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUserEmail(String userEmail){
        return userRepository.findByUserEmail(userEmail);
    }

    public User getLoggedEmailByEmail(String loggedEmail){return userRepository.findByUserEmail(loggedEmail);}

    public boolean checkPassword(User user, String password) {
        return user != null && user.getUserPassword().equals(password);
    }

    public void login(User user) {
        if (user != null) {
            user.setLoggedIn(true);
            userRepository.save(user);
        }
    }

    public void logout(User user) {
        if (user != null) {
            user.setLoggedIn(false);
            userRepository.save(user);
        }
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    public String getUserTypeByEmail(String userEmail) {
        User user = findByUserEmail(userEmail);

        if (user != null) {
            boolean isMusteri = user.isMusteri();
            boolean isKuafor = user.isKuafor();

            if (isMusteri && !isKuafor) {
                return "Musteri";
            } else if (!isMusteri && isKuafor) {
                return "Kuaför";
            } else {
                return "Belirlenemiyor";
            }
        } else {
            return "Kullanıcı bulunamadı.";
        }
    }
}