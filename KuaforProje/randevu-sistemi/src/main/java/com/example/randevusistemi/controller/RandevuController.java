package com.example.randevusistemi.controller;

import com.example.randevusistemi.entity.Randevu;
import com.example.randevusistemi.service.RandevuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/randevular")
public class RandevuController {

    private final RandevuService randevuService;

    @Autowired
    public RandevuController(RandevuService randevuService) {
        this.randevuService = randevuService;
    }

    @GetMapping
    public ResponseEntity<List<Randevu>> getAllRandevular() {
        List<Randevu> randevular = randevuService.getAllRandevular();
        return new ResponseEntity<>(randevular, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Randevu> getRandevuById(@PathVariable Long id) {
        Optional<Randevu> randevu = randevuService.getRandevuById(id);
        return randevu.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Randevu> createRandevu(@RequestBody Randevu randevu) {
        Randevu createdRandevu = randevuService.saveRandevu(randevu);
        return new ResponseEntity<>(createdRandevu, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Randevu> updateRandevu(@PathVariable Long id, @RequestBody Randevu randevu) {
        if (randevuService.getRandevuById(id).isPresent()) {
            randevu.setId(id);
            Randevu updatedRandevu = randevuService.saveRandevu(randevu);
            return new ResponseEntity<>(updatedRandevu, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRandevu(@PathVariable Long id) {
        if (randevuService.getRandevuById(id).isPresent()) {
            randevuService.deleteRandevu(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
