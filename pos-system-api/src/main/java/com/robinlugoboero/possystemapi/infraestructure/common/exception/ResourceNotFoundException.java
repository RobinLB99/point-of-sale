package com.robinlugoboero.possystemapi.infraestructure.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción personalizada para representar la ausencia de un recurso en el sistema.
 * Se mapea automáticamente a un estado HTTP 404 (Not Found).
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

  /**
   * Construye la excepción con un mensaje detallado.
   *
   * @param message Descripción de qué recurso no se encontró.
   */
  public ResourceNotFoundException(String message) {
    super(message);
  }
}
