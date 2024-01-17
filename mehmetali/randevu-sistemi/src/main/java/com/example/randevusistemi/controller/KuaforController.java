package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.Kuafor;
import com.example.randevusistemi.service.KuaforService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kuaforler")
public class KuaforController {

    private final KuaforService kuaforService;

    @Autowired
    public KuaforController(KuaforService kuaforService) {this.kuaforService = kuaforService;}

    @GetMapping
    public ResponseEntity<List<Kuafor>> getAllKuaforler() {
        List<Kuafor> kuaforler = kuaforService.getAllKuaforler();
        return new ResponseEntity<>(kuaforler, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Kuafor> createCalismaSaati(@RequestBody Kuafor kuafor) {
        Kuafor createdCalismaSaati = kuaforService.saveKuafor(kuafor);
        return new ResponseEntity<>(createdCalismaSaati, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalismaSaati(@PathVariable Long id) {
        if (kuaforService.getCalismaSaatiById(id).isPresent()) {
            kuaforService.deleteCalismaSaati(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
/*
    @PostMapping("/kaydet")
    public void kaydet(@RequestBody Kuafor kuafor) {
        // Gelen veriyi doğrudan kaydetme işlemini gerçekleştirin
        kuaforService.kaydet(kuafor);
    }
*/


}
