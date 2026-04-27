package com.robinlugoboero.possystemapi.application.auth.mapper;

import com.robinlugoboero.possystemapi.application.auth.dto.MeDTO;
import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import org.springframework.stereotype.Component;

/**
 * Mapper especializado en la transformación de la entidad Usuario a DTOs de perfil.
 * Facilita la exposición selectiva de datos del usuario autenticado.
 */
@Component
public class MeMapper {

  /**
   * Convierte una entidad Usuario en un DTO MeDTO.
   * Realiza la conversión de la colección de roles a una lista estándar.
   *
   * @param usuario Entidad de dominio con los datos completos.
   * @return DTO con la información lista para el consumo de la API.
   */
  public MeDTO toDTO(Usuario usuario) {
    return new MeDTO(
      usuario.getId(),
      usuario.getUsuario(),
      usuario.getNombre(),
      usuario.getRoles().stream().toList(),
      usuario.getFechaRegistro()
    );
  }
}
