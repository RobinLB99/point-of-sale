package com.robinlugoboero.possystemapi.application.auth.dto;

public record LoginResponseDTO(
    String token,
    MeDTO user
) {}
