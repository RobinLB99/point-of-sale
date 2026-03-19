package com.robinlugoboero.possystemapi.application.cashregister.controller;

import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterOpenRequestDTO;
import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterOpenResponseDTO;
import com.robinlugoboero.possystemapi.application.cashregister.service.CashRegisterService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador REST para la gestión de operaciones de caja.
 * Proporciona endpoints para la apertura y cierre de turnos de caja,
 * restringidos por roles específicos de seguridad.
 */
@AllArgsConstructor
@RestController
@RequestMapping("/cashregister")
public class CashRegisterController {

  private CashRegisterService cashRegisterService;

  /**
   * Endpoint para abrir una caja.
   * Requiere permisos de ADMIN o CAJA.
   *
   * @param entity Datos de apertura validados.
   * @return ResponseEntity con la información de la caja abierta y estado HTTP 200 (OK).
   */
  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CAJA')")
  @PostMapping("/open")
  public ResponseEntity<CashRegisterOpenResponseDTO> openCashRegister(
    @Valid @RequestBody CashRegisterOpenRequestDTO entity
  ) {
    return ResponseEntity.ok(cashRegisterService.abrirCaja(entity));
  }
}
