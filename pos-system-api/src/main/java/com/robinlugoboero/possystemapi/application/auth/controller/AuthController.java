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

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final AuthService authService;
  private final TokenService tokenService;

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

  @GetMapping("/me")
  public ResponseEntity<MeDTO> getMe(Authentication authentication) {
    return ResponseEntity.ok(authService.getUserInfo(authentication.getName()));
  }
}
