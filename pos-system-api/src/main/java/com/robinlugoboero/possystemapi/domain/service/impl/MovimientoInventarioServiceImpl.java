package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.MovimientoInventario;
import com.robinlugoboero.possystemapi.domain.repository.MovimientoInventarioRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.MovimientoInventarioService;
import org.springframework.stereotype.Service;

@Service
public class MovimientoInventarioServiceImpl extends AbstractGenericService<MovimientoInventario, MovimientoInventarioRepository> implements MovimientoInventarioService {
    public MovimientoInventarioServiceImpl(MovimientoInventarioRepository repository) {
        super(repository);
    }
}
