package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.repository.UsuarioRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.UsuarioService;
import com.robinlugoboero.possystemapi.infraestructure.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl extends AbstractGenericService<Usuario, UsuarioRepository> implements UsuarioService {
    public UsuarioServiceImpl(UsuarioRepository repository) {
        super(repository);
    }

    @Override
    public Usuario findByUsername(String username) {
        return repository
                .findByUsuario(username)
                .orElseThrow(
                    () -> new ResourceNotFoundException(
                        "No se encontró el usuario: " + username
                    )
                );
    }
}
