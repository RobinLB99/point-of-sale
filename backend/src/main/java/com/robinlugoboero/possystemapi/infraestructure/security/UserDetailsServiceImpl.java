package com.robinlugoboero.possystemapi.infraestructure.security;

import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.repository.UsuarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Implementación de UserDetailsService de Spring Security.
 * Actúa como adaptador entre el repositorio de usuarios del dominio
 * y el mecanismo de autenticación del framework.
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UsuarioRepository usuarioRepository;

  /**
   * Recupera un usuario de la base de datos y lo transforma en un objeto UserDetails.
   * Realiza el mapeo crítico de los roles de dominio a autoridades de Spring Security.
   *
   * @param username Nombre del usuario a autenticar.
   * @return UserDetails instancia cargada con roles y estado de activación.
   * @throws UsernameNotFoundException si el usuario no existe en el sistema.
   */
  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    Usuario usuario = usuarioRepository
      .findByUsuario(username)
      .orElseThrow(() ->
        new UsernameNotFoundException("Usuario no encontrado: " + username)
      );

    // Mapeamos los roles con el prefijo ROLE_ explícito
    // Requerido por Spring Security para la validación con hasRole() o @PreAuthorize
    List<SimpleGrantedAuthority> authorities = usuario
      .getRoles()
      .stream()
      .map(rol -> new SimpleGrantedAuthority("ROLE_" + rol.name()))
      .toList();

    return User.withUsername(usuario.getUsuario())
      .password(usuario.getPassword())
      .authorities(authorities)
      .disabled(!usuario.isActivo())
      .build();
  }
}
