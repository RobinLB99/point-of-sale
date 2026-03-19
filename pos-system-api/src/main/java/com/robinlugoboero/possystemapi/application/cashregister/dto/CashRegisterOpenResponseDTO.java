package com.robinlugoboero.possystemapi.application.cashregister.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * DTO de respuesta tras una apertura de caja exitosa.
 * Proporciona un resumen de la transacción de apertura.
 * 
 * @param usuario_nombre Nombre del usuario que abrió la caja.
 * @param saldo_inicial Monto inicial registrado.
 * @param open_at Marca de tiempo de la apertura.
 */
public record CashRegisterOpenResponseDTO(
	String usuario_nombre,
	BigDecimal saldo_inicial,
	OffsetDateTime open_at
) {}
