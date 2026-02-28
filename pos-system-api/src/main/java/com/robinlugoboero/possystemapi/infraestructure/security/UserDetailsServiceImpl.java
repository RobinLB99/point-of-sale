package com.robinlugoboero.possystemapi.infraestructure.security;

import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UsuarioRepository usuarioRepository;

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    Usuario usuario = usuarioRepository
      .findByUsuario(username)
      .orElseThrow(() ->
        new UsernameNotFoundException("Usuario no encontrado: " + username)
      );

    String[] roles = usuario
      .getRoles()
      .stream()
      .map(Enum::name)
      .toArray(String[]::new);

    return User.withUsername(usuario.getUsuario())
      .password(usuario.getPassword())
      .roles(roles)
      .disabled(!usuario.isActivo())
      .build();
  }
}
