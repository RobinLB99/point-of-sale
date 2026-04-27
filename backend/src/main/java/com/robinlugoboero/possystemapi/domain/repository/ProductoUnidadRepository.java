package com.robinlugoboero.possystemapi.domain.repository;

import com.robinlugoboero.possystemapi.domain.model.entity.ProductoUnidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoUnidadRepository extends JpaRepository<ProductoUnidad, Long> {
}
