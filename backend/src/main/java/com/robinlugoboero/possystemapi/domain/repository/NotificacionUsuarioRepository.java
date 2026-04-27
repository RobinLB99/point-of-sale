package com.robinlugoboero.possystemapi.domain.repository;

import com.robinlugoboero.possystemapi.domain.model.entity.NotificacionUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificacionUsuarioRepository extends JpaRepository<NotificacionUsuario, Long> {
}
