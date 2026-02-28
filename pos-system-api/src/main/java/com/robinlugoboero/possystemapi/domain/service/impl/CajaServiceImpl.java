package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Caja;
import com.robinlugoboero.possystemapi.domain.repository.CajaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.CajaService;
import org.springframework.stereotype.Service;

@Service
public class CajaServiceImpl extends AbstractGenericService<Caja, CajaRepository> implements CajaService {
    public CajaServiceImpl(CajaRepository repository) {
        super(repository);
    }
}
