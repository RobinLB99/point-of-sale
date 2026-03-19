package com.robinlugoboero.possystemapi.application.cashregister.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

/**
 * DTO para la solicitud de apertura de caja.
 * Contiene la información necesaria para iniciar un nuevo turno de caja.
 *
 * @param usuario_id ID del usuario que realiza la apertura (generalmente el cajero).
 * @param saldo_inicial Monto de dinero con el que se inicia la jornada.
 * @param notas_apertura Comentarios opcionales sobre el estado inicial de la caja.
 */
public record CashRegisterOpenRequestDTO(
	@NotNull(message = "El id de usuario es obligatorio") Long usuario_id,
	@NotNull(message = "El saldo inicial es obligatorio") BigDecimal saldo_inicial,
	String notas_apertura
) {}
