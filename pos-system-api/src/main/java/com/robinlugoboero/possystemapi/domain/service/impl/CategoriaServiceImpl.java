package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Categoria;
import com.robinlugoboero.possystemapi.domain.repository.CategoriaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.CategoriaService;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl extends AbstractGenericService<Categoria, CategoriaRepository> implements CategoriaService {
    public CategoriaServiceImpl(CategoriaRepository repository) {
        super(repository);
    }
}
