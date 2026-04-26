package com.robinlugoboero.possystemapi.application.pos.dto;

import java.math.BigDecimal;

public record ProductoResponseDTO(
	Long producto_id,
	String nombre,
	String categoria,
	BigDecimal precio,
	BigDecimal stock
) {}
