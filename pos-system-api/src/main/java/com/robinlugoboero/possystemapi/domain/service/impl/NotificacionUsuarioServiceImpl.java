package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.NotificacionUsuario;
import com.robinlugoboero.possystemapi.domain.repository.NotificacionUsuarioRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.NotificacionUsuarioService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NotificacionUsuarioServiceImpl extends AbstractGenericService<NotificacionUsuario, NotificacionUsuarioRepository> implements NotificacionUsuarioService {
    public NotificacionUsuarioServiceImpl(NotificacionUsuarioRepository repository) {
        super(repository);
    }

	@Override
	public Page<NotificacionUsuario> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
