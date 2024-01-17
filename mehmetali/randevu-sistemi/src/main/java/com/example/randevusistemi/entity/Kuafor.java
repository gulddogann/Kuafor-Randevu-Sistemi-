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
@Table(name = "kuaforler")
public class Kuafor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String calisanKuaforEmail;
    private LocalDate calismaTarihi;
    private LocalTime calismaSaatleriBaslangic;
    private LocalTime calismaSaatleriBitis;

}
