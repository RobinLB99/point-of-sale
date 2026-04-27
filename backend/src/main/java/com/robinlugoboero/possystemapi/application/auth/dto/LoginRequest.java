package com.robinlugoboero.possystemapi.application.auth.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO para la solicitud de inicio de sesión.
 * Contiene las credenciales necesarias para autenticar a un usuario.
 *
 * @param username Nombre de usuario único en el sistema.
 * @param password Contraseña en texto plano (será procesada por el AuthenticationManager).
 */
public record LoginRequest(
  @NotBlank(message = "El usuario es obligatorio") String username,
  @NotBlank(message = "La contraseña es obligatorio") String password
) {}
