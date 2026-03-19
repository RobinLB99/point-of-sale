package com.robinlugoboero.possystemapi.application.cashregister.service;

import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterOpenRequestDTO;
import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterOpenResponseDTO;
import com.robinlugoboero.possystemapi.application.cashregister.mapper.CashRegisterMapper;
import com.robinlugoboero.possystemapi.domain.model.entity.Caja;
import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;
import com.robinlugoboero.possystemapi.domain.model.enums.EstadoCaja;
import com.robinlugoboero.possystemapi.domain.service.impl.CajaServiceImpl;
import com.robinlugoboero.possystemapi.domain.service.impl.UsuarioServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de aplicación para la gestión de Caja.
 * Orquestra las operaciones de apertura y cierre de caja, coordinando los servicios
 * de dominio y los mappers correspondientes.
 */
@AllArgsConstructor
@Service
public class CashRegisterService {

  private CashRegisterMapper mapper;
  private CajaServiceImpl cajaService;
  private UsuarioServiceImpl usuarioService;

  /**
   * Realiza el proceso completo de apertura de caja.
   * Busca al usuario, mapea los datos a una entidad Caja, la persiste y retorna el DTO de respuesta.
   *
   * @param dto Datos de la solicitud de apertura.
   * @return Información de la caja recién abierta.
   * @throws RuntimeException si el usuario no existe (vía usuarioService).
   */
  @Transactional
  public CashRegisterOpenResponseDTO abrirCaja(CashRegisterOpenRequestDTO dto) {
    Usuario usuario = usuarioService.find(dto.usuario_id());

    Caja caja = mapper.toEntity(dto, usuario);
    caja.setEstado(EstadoCaja.ABIERTA);
    caja = cajaService.save(caja);

    return mapper.toOpenDTO(caja);
  }
}
