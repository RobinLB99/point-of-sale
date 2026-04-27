package com.robinlugoboero.possystemapi.infraestructure.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

/**
 * Servicio encargado de la fábrica y gestión de tokens JWT.
 * Implementa la lógica de emisión de credenciales efímeras basadas en claims.
 */
@Service
@RequiredArgsConstructor
public class TokenService {

  private final JwtEncoder encoder;

  /**
   * Genera un token JWT firmado asimétricamente para un usuario autenticado.
   * El token incluye claims estándar y el 'scope' basado en los roles del usuario.
   *
   * @param authentication Objeto que contiene el sujeto y sus autoridades.
   * @return String del token JWT codificado.
   */
  public String generateToken(Authentication authentication) {
    Instant now = Instant.now();

    // Extraemos las autoridades y limpiamos el prefijo ROLE_ para el token
    // Esto mantiene el payload del token más ligero y legible.
    String scope = authentication
      .getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .map(authority -> authority.replace("ROLE_", ""))
      .collect(Collectors.joining(" "));

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuer("pos-system-api")
      .issuedAt(now)
      .expiresAt(now.plus(5, ChronoUnit.HOURS)) // Sesión válida por 5 horas
      .subject(authentication.getName())
      .claim("scope", scope)
      .build();

    return this.encoder.encode(
      JwtEncoderParameters.from(claims)
    ).getTokenValue();
  }
}
