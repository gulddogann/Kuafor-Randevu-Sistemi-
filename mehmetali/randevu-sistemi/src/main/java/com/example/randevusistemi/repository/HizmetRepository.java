package com.example.randevusistemi.repository;

import com.example.randevusistemi.entity.Hizmet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HizmetRepository extends JpaRepository<Hizmet, Long> {
    // Özel sorgular veya işlemler eklemek isterseniz buraya ekleyebilirsiniz.
}
