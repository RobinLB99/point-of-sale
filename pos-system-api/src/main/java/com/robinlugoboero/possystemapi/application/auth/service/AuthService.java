package com.robinlugoboero.possystemapi.application.auth.service;

import com.robinlugoboero.possystemapi.application.auth.dto.MeDTO;
import com.robinlugoboero.possystemapi.application.auth.mapper.MeMapper;
import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.service.impl.UsuarioServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Servicio de aplicación para la gestión de la identidad del usuario.
 * Proporciona métodos para recuperar información detallada del usuario
 * en el contexto de la autenticación.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

  private final UsuarioServiceImpl usuarioService;
  private final MeMapper mapper;

  /**
   * Obtiene la información del perfil del usuario basado en su nombre de usuario.
   *
   * @param username Nombre de usuario a buscar.
   * @return DTO con la información del perfil del usuario.
   * @throws RuntimeException si el usuario no es encontrado (vía usuarioService).
   */
  public MeDTO getUserInfo(String username) {
    Usuario usuario = usuarioService.findByUsername(username);
    return mapper.toDTO(usuario);
  }
}
