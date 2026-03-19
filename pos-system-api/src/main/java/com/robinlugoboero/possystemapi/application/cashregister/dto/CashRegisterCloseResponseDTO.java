package com.robinlugoboero.possystemapi.application.cashregister.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * DTO de respuesta tras el cierre de caja.
 * 
 * @param usuario_nombre Nombre del usuario que cerró la caja.
 * @param saldo_final Saldo total registrado al momento del cierre.
 * @param closeAt Marca de tiempo del cierre.
 */
public record CashRegisterCloseResponseDTO(
	String usuario_nombre,
	BigDecimal saldo_final,
	OffsetDateTime closeAt
) {}
