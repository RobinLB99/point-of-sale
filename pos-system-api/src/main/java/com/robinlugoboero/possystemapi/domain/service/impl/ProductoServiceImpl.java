package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Producto;
import com.robinlugoboero.possystemapi.domain.repository.ProductoRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.ProductoService;
import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl extends AbstractGenericService<Producto, ProductoRepository> implements ProductoService {
    public ProductoServiceImpl(ProductoRepository repository) {
        super(repository);
    }
}
