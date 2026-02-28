package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Iva;
import com.robinlugoboero.possystemapi.domain.repository.IvaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.IvaService;
import org.springframework.stereotype.Service;

@Service
public class IvaServiceImpl extends AbstractGenericService<Iva, IvaRepository> implements IvaService {
    public IvaServiceImpl(IvaRepository repository) {
        super(repository);
    }
}
