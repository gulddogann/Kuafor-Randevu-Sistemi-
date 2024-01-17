package com.example.randevusistemi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String userAd;
    private String userSoyad;
    private String userEmail;
    private String userPassword;
    private String loggedEmail;
    private boolean loggedIn;
    private boolean isAdmin;
    private boolean isKuafor;
    private boolean isMusteri;


}
