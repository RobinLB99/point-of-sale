package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Pago;
import com.robinlugoboero.possystemapi.domain.repository.PagoRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.PagoService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PagoServiceImpl extends AbstractGenericService<Pago, PagoRepository> implements PagoService {
    public PagoServiceImpl(PagoRepository repository) {
        super(repository);
    }

	@Override
	public Page<Pago> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
