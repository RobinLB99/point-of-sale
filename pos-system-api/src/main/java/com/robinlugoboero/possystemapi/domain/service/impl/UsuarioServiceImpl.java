package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.repository.UsuarioRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.UsuarioService;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl extends AbstractGenericService<Usuario, UsuarioRepository> implements UsuarioService {
    public UsuarioServiceImpl(UsuarioRepository repository) {
        super(repository);
    }
}
