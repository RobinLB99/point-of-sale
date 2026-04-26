package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.ProductoUnidad;
import com.robinlugoboero.possystemapi.domain.repository.ProductoUnidadRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.ProductoUnidadService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductoUnidadServiceImpl extends AbstractGenericService<ProductoUnidad, ProductoUnidadRepository> implements ProductoUnidadService {
    public ProductoUnidadServiceImpl(ProductoUnidadRepository repository) {
        super(repository);
    }

	@Override
	public Page<ProductoUnidad> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
