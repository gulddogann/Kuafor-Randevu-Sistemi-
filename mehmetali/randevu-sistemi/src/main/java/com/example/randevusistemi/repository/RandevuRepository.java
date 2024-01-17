package com.example.randevusistemi.repository;

import com.example.randevusistemi.entity.Randevu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RandevuRepository extends JpaRepository<Randevu, Long> {
}
