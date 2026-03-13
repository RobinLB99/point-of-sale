package com.robinlugoboero.possystemapi.application.auth.mapper;

import com.robinlugoboero.possystemapi.application.auth.dto.MeDTO;
import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import org.springframework.stereotype.Component;

@Component
public class MeMapper {
    public MeDTO toDTO(Usuario usuario) {
        return new MeDTO(
            usuario.getId(),
            usuario.getUsuario(),
            usuario.getNombre(),
            usuario.getRoles().stream().toList(),
            usuario.getFechaRegistro()
        );
    }
}
