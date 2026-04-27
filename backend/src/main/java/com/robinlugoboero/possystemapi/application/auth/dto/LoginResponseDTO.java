package com.robinlugoboero.possystemapi.application.auth.dto;

/**
 * DTO de respuesta tras una autenticación exitosa.
 * Proporciona el token JWT para sesiones subsecuentes y la información básica del usuario.
 * 
 * @param token JWT (JSON Web Token) generado para el usuario.
 * @param user Información resumida del usuario autenticado.
 */
public record LoginResponseDTO(
    String token,
    MeDTO user
) {}
