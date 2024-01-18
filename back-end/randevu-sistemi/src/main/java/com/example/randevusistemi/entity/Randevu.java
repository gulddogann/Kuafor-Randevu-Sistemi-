package com.example.randevusistemi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "randevular")
public class Randevu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String randevuMusteriAd;
    private String randevuEmail;
    private String randevuKuafor;
    private String randevuHizmet;
    private String randevuNot;
    private LocalDate randevuTarih;
    private LocalTime randevuSaat;

}
