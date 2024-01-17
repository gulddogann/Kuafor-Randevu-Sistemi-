package com.example.randevusistemi.repository;

import com.example.randevusistemi.entity.Kuafor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KuaforRepository extends JpaRepository<Kuafor, Long> {
    // Ekstra sorgular veya yöntemler buraya eklenebilir
}
