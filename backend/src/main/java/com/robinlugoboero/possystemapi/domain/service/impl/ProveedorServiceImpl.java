package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Proveedor;
import com.robinlugoboero.possystemapi.domain.repository.ProveedorRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.ProveedorService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProveedorServiceImpl extends AbstractGenericService<Proveedor, ProveedorRepository> implements ProveedorService {
    public ProveedorServiceImpl(ProveedorRepository repository) {
        super(repository);
    }

	@Override
	public Page<Proveedor> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
