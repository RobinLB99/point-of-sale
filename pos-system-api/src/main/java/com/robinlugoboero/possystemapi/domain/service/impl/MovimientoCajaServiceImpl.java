package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.MovimientoCaja;
import com.robinlugoboero.possystemapi.domain.repository.MovimientoCajaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.MovimientoCajaService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MovimientoCajaServiceImpl extends AbstractGenericService<MovimientoCaja, MovimientoCajaRepository> implements MovimientoCajaService {
    public MovimientoCajaServiceImpl(MovimientoCajaRepository repository) {
        super(repository);
    }

	@Override
	public Page<MovimientoCaja> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
