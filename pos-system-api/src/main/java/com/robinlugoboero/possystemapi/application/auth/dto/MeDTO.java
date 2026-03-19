package com.robinlugoboero.possystemapi.application.auth.dto;

import com.robinlugoboero.possystemapi.domain.model.enums.RolUsuario;
import java.time.OffsetDateTime;
import java.util.List;

/**
 * DTO que representa el perfil y estado del usuario actual autenticado.
 * Utilizado para mostrar información en el frontend y gestionar permisos en el cliente.
 *
 * @param id Identificador único del usuario.
 * @param username Nombre de usuario.
 * @param name Nombre completo del usuario.
 * @param roles Lista de roles asignados que definen sus permisos en el sistema.
 * @param createdAt Fecha y hora en la que el usuario fue registrado.
 */
public record MeDTO(
  Long id,
  String username,
  String name,
  List<RolUsuario> roles,
  OffsetDateTime createdAt
) {}
