package com.example.randevusistemi.dto;

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
public class KuaforDto {

    private Long id;
    private String calisanKuaforEmail;
    private LocalDate calismaTarihi;
    private LocalTime calismaSaatleriBaslangic;
    private LocalTime calismaSaatleriBitis;

}