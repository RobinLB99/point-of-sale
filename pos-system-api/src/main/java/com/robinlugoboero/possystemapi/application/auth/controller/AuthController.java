package com.robinlugoboero.possystemapi.application.auth.controller;

import com.robinlugoboero.possystemapi.application.auth.dto.LoginRequest;
import com.robinlugoboero.possystemapi.application.auth.dto.LoginResponseDTO;
import com.robinlugoboero.possystemapi.application.auth.dto.MeDTO;
import com.robinlugoboero.possystemapi.application.auth.service.AuthService;
import com.robinlugoboero.possystemapi.infraestructure.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador REST encargado de los procesos de autenticación y gestión de sesión.
 * Maneja el intercambio de credenciales por tokens JWT y la recuperación del perfil de usuario.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final AuthService authService;
  private final TokenService tokenService;

  /**
   * Procesa la solicitud de inicio de sesión.
   * Autentica las credenciales, genera un token JWT y retorna la información del usuario.
   *
   * @param loginRequest DTO con username y password.
   * @return ResponseEntity con el token JWT y el perfil del usuario.
   */
  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> login(
    @Valid @RequestBody LoginRequest loginRequest
  ) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.username(),
        loginRequest.password()
      )
    );

    String token = tokenService.generateToken(authentication);
    MeDTO user = authService.getUserInfo(authentication.getName());

    return ResponseEntity.ok(new LoginResponseDTO(token, user));
  }

  /**
   * Obtiene la información del usuario actualmente autenticado.
   * Útil para revalidar la sesión en el cliente (frontend).
   *
   * @param authentication Objeto de autenticación inyectado por Spring Security.
   * @return ResponseEntity con el perfil del usuario actual.
   */
  @GetMapping("/me")
  public ResponseEntity<MeDTO> getMe(Authentication authentication) {
    return ResponseEntity.ok(authService.getUserInfo(authentication.getName()));
  }
}
