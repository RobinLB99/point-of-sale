package com.robinlugoboero.possystemapi.application.pos.mapper;

import org.springframework.stereotype.Component;

import com.robinlugoboero.possystemapi.application.pos.dto.ProductoResponseDTO;
import com.robinlugoboero.possystemapi.domain.model.entity.Producto;

@Component
public class ProductoMapper {

	public  ProductoResponseDTO toDTO(Producto producto) {
		return new ProductoResponseDTO(
			producto.getId(),
			producto.getNombre(),
			producto.getCategoria().getNombre(),
			producto.getCosto(),
			producto.getStock()
		);
	}
	
}
