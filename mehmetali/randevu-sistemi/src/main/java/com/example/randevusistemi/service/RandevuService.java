package com.example.randevusistemi.service;

import com.example.randevusistemi.entity.Randevu;
import com.example.randevusistemi.repository.RandevuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RandevuService {

    private final RandevuRepository randevuRepository;

    @Autowired
    public RandevuService(RandevuRepository randevuRepository) {
        this.randevuRepository = randevuRepository;
    }

    public List<Randevu> getAllRandevular() {
        return randevuRepository.findAll();
    }

    public Optional<Randevu> getRandevuById(Long id) {
        return randevuRepository.findById(id);
    }

    public Randevu saveRandevu(Randevu randevu) {
        return randevuRepository.save(randevu);
    }

    public void deleteRandevu(Long id) {
        randevuRepository.deleteById(id);
    }
}
