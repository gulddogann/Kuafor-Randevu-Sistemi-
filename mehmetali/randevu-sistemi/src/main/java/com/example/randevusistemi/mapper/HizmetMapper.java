package com.example.randevusistemi.mapper;

import com.example.randevusistemi.dto.HizmetDto;
import com.example.randevusistemi.entity.Hizmet;

public class HizmetMapper {

    public static HizmetDto mapToHizmetDto(Hizmet hizmet){
        return new HizmetDto(
                hizmet.getId(),
                hizmet.getHizmetAd()
        );
    }

    public static Hizmet mapToHizmet(HizmetDto hizmetDto){
        return new Hizmet(
                hizmetDto.getId(),
                hizmetDto.getHizmetAd()
        );
    }
}
