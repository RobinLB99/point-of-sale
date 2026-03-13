package com.robinlugoboero.possystemapi.application.auth.service;

import com.robinlugoboero.possystemapi.application.auth.dto.MeDTO;
import com.robinlugoboero.possystemapi.application.auth.mapper.MeMapper;
import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.service.impl.UsuarioServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioServiceImpl usuarioService;
    private final MeMapper mapper;

    public MeDTO getUserInfo(String username) {
        Usuario usuario = usuarioService.findByUsername(username);
        return mapper.toDTO(usuario);
    }
}
