package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Venta;
import com.robinlugoboero.possystemapi.domain.repository.VentaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.VentaService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VentaServiceImpl extends AbstractGenericService<Venta, VentaRepository> implements VentaService {
    public VentaServiceImpl(VentaRepository repository) {
        super(repository);
    }

	@Override
	public Page<Venta> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
