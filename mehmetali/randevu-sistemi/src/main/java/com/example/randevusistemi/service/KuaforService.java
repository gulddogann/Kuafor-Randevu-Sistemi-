package com.example.randevusistemi.service;

import com.example.randevusistemi.entity.Kuafor;
import com.example.randevusistemi.repository.KuaforRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class KuaforService {

    private final KuaforRepository kuaforRepository;

    public Kuafor saveKuafor(Kuafor kuafor){return kuaforRepository.save(kuafor);}

    public List<Kuafor> getAllKuaforler(){return kuaforRepository.findAll();}

    public Optional<Kuafor> getCalismaSaatiById(Long id) {
        return kuaforRepository.findById(id);
    }

    public void deleteCalismaSaati(Long id){kuaforRepository.deleteById(id);}

    public void kaydet(Kuafor kuafor) {
        // Kuafor entity'sini kaydet
        kuaforRepository.save(kuafor);
    }
}
