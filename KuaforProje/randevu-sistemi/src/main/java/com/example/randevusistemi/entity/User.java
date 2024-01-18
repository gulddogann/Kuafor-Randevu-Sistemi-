package com.example.randevusistemi.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userAd;
    private String userSoyad;
    private String userEmail;
    private String userPassword;
    private String loggedEmail;
    private boolean loggedIn;
    private boolean isAdmin;
    @JsonProperty("isKuafor")
    private boolean isKuafor;
    private boolean isMusteri;
}
