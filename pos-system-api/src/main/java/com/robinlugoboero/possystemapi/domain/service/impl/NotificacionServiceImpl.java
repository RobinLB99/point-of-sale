package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Notificacion;
import com.robinlugoboero.possystemapi.domain.repository.NotificacionRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.NotificacionService;
import org.springframework.stereotype.Service;

@Service
public class NotificacionServiceImpl extends AbstractGenericService<Notificacion, NotificacionRepository> implements NotificacionService {
    public NotificacionServiceImpl(NotificacionRepository repository) {
        super(repository);
    }
}
