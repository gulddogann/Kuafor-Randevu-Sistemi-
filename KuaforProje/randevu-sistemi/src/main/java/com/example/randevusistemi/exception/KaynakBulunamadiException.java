package com.example.randevusistemi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class KaynakBulunamadiException extends RuntimeException {

    public KaynakBulunamadiException(String mesaj) {
        super(mesaj);
    }
}
