package com.robinlugoboero.possystemapi.domain.service.interfaces;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.robinlugoboero.possystemapi.domain.model.entity.Producto;

public interface ProductoService extends Generic<Producto> {
	
	public Page<Producto> buscarPorNombreIgnorandoCase(String nombre, Pageable pageable);
	
}
