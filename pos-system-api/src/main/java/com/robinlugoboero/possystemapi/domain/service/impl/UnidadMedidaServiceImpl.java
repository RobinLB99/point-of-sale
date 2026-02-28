package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.UnidadMedida;
import com.robinlugoboero.possystemapi.domain.repository.UnidadMedidaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.UnidadMedidaService;
import org.springframework.stereotype.Service;

@Service
public class UnidadMedidaServiceImpl extends AbstractGenericService<UnidadMedida, UnidadMedidaRepository> implements UnidadMedidaService {
    public UnidadMedidaServiceImpl(UnidadMedidaRepository repository) {
        super(repository);
    }
}
