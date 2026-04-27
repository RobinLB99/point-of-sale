package com.robinlugoboero.possystemapi.infraestructure.common.exception;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Manejador centralizado de excepciones para toda la API.
 * Captura excepciones específicas y las transforma en respuestas JSON estructuradas,
 * garantizando que el cliente siempre reciba un formato de error consistente.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * Captura errores de autenticación fallida (credenciales incorrectas).
   *
   * @param e Excepción de Spring Security.
   * @return ResponseEntity con estado 401 y un cuerpo descriptivo del error.
   */
  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<?> handleBadCredentials(BadCredentialsException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
      Map.of(
        "error",
        "Credenciales inválidas",
        "message",
        "Usuario o contraseña incorrectos",
        "status",
        401
      )
    );
  }
}
