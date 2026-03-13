package com.robinlugoboero.possystemapi.application.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank(message = "El usuario es obligatorio") String username,
    @NotBlank(message = "La contraseña es obligatorio") String password
) {}
