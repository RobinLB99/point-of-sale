package com.robinlugoboero.possystemapi.application.cashregister.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO para la solicitud de cierre de caja.
 *
 * @param usuario_id ID del usuario que realiza el cierre.
 */
public record CashRegisterCloseRequestDTO(
	@NotNull(message = "El id de usuario es obligatorio") Long usuario_id
) {}
