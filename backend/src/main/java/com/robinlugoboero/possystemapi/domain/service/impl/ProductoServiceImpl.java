package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Producto;
import com.robinlugoboero.possystemapi.domain.repository.ProductoRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.ProductoService;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl extends AbstractGenericService<Producto, ProductoRepository> implements ProductoService {
    public ProductoServiceImpl(ProductoRepository repository) {
        super(repository);
    }

	@Override
	public Page<Producto> buscarPorNombreIgnorandoCase(String nombre, Pageable pageable) {
		return repository.findByNombreContainingIgnoreCase(nombre, pageable);
	}

	@Override
	public Page<Producto> getPaginated(Pageable pageble) {
		return repository.findAll(pageble);
	}
}
