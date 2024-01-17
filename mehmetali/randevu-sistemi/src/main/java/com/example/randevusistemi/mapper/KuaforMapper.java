package com.example.randevusistemi.mapper;

import com.example.randevusistemi.dto.KuaforDto;
import com.example.randevusistemi.entity.Kuafor;

public class KuaforMapper {

    public static KuaforDto mapToKuaforDto(Kuafor kuafor){
        return new KuaforDto(
                kuafor.getId(),
                kuafor.getCalisanKuaforEmail(),
                kuafor.getCalismaTarihi(),
                kuafor.getCalismaSaatleriBaslangic(),
                kuafor.getCalismaSaatleriBitis()
        );
    }
    public static Kuafor mapToKuafor(KuaforDto kuaforDto){
        return new Kuafor(
                kuaforDto.getId(),
                kuaforDto.getCalisanKuaforEmail(),
                kuaforDto.getCalismaTarihi(),
                kuaforDto.getCalismaSaatleriBaslangic(),
                kuaforDto.getCalismaSaatleriBitis()
        );
    }
}