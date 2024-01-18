package com.example.randevusistemi.mapper;

import com.example.randevusistemi.dto.RandevuDto;
import com.example.randevusistemi.entity.Randevu;

public class RandevuMapper {


    public static RandevuDto maptoRandevuDto(Randevu randevu) {
        return new RandevuDto(
                randevu.getId(),
                randevu.getRandevuMusteriAd(),
                randevu.getRandevuEmail(),
                randevu.getRandevuKuafor(),
                randevu.getRandevuHizmet(),
                randevu.getRandevuNot(),
                randevu.getRandevuTarih(),
                randevu.getRandevuSaat()
        );
    }

    public static Randevu mapToRandevu(RandevuDto randevuDto){
        return new Randevu(
                randevuDto.getId(),
                randevuDto.getRandevuMusteriAd(),
                randevuDto.getRandevuEmail(),
                randevuDto.getRandevuKuafor(),
                randevuDto.getRandevuHizmet(),
                randevuDto.getRandevuNot(),
                randevuDto.getRandevuTarih(),
                randevuDto.getRandevuSaat()
        );
    }
}
