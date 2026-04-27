package com.robinlugoboero.possystemapi.domain.repository;

import com.robinlugoboero.possystemapi.domain.model.entity.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
  public Page<Producto> findByNombreContainingIgnoreCase(
    String name,
    Pageable pageable
  );
}
