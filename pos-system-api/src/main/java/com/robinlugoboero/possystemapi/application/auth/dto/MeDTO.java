package com.robinlugoboero.possystemapi.application.auth.dto;

import com.robinlugoboero.possystemapi.domain.model.enums.RolUsuario;

import java.time.OffsetDateTime;
import java.util.List;

public record MeDTO(
    Long id,
    String username,
    String name,
    List<RolUsuario> roles,
    OffsetDateTime createdAt
) {}
