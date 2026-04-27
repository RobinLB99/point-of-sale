package com.robinlugoboero.possystemapi.domain.repository;

import com.robinlugoboero.possystemapi.domain.model.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
}
