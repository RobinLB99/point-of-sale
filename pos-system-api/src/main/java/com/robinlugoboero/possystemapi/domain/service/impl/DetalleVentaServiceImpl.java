package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.DetalleVenta;
import com.robinlugoboero.possystemapi.domain.repository.DetalleVentaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.DetalleVentaService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DetalleVentaServiceImpl extends AbstractGenericService<DetalleVenta, DetalleVentaRepository> implements DetalleVentaService {
    public DetalleVentaServiceImpl(DetalleVentaRepository repository) {
        super(repository);
    }

	@Override
	public Page<DetalleVenta> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
