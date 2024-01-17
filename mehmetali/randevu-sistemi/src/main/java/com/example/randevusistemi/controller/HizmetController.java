package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.Hizmet;
import com.example.randevusistemi.repository.HizmetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hizmetler")
public class HizmetController {

    private final HizmetRepository hizmetRepository;

    @Autowired
    public HizmetController(HizmetRepository hizmetRepository) {
        this.hizmetRepository = hizmetRepository;
    }

    // Tüm hizmetleri getir
    @GetMapping
    public List<Hizmet> getAllHizmetler() {
        return hizmetRepository.findAll();
    }
}