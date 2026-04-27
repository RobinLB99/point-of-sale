package com.robinlugoboero.possystemapi.domain.repository;

import com.robinlugoboero.possystemapi.domain.model.entity.UnidadMedida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadMedidaRepository extends JpaRepository<UnidadMedida, Long> {
}
