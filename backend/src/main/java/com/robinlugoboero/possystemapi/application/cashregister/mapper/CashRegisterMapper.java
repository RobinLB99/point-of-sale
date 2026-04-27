package com.robinlugoboero.possystemapi.application.cashregister.mapper;

import org.springframework.stereotype.Component;

import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterCloseResponseDTO;
import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterOpenRequestDTO;
import com.robinlugoboero.possystemapi.application.cashregister.dto.CashRegisterOpenResponseDTO;
import com.robinlugoboero.possystemapi.domain.model.entity.Caja;
import com.robinlugoboero.possystemapi.domain.model.entity.Usuario;

/**
 * Componente encargado de la transformación de datos entre DTOs y Entidades del dominio de Caja.
 * Centraliza la lógica de mapeo para mantener desacoplada la capa de aplicación de la capa de dominio.
 */
@Component
public class CashRegisterMapper {

	/**
	 * Transforma un DTO de apertura en una entidad Caja.
	 * 
	 * @param dto Información de apertura proveniente de la petición.
	 * @param usuario Entidad Usuario que realiza la apertura.
	 * @return Entidad Caja configurada para ser persistida.
	 */
	public Caja toEntity(CashRegisterOpenRequestDTO dto, Usuario usuario) {
		Caja caja = new Caja();
		caja.setSaldoInicial(dto.saldo_inicial());
		caja.setUsuarioApertura(usuario);
		caja.setNotas(dto.notas_apertura());
		
		return caja;
	}
	
	/**
	 * Transforma una entidad Caja en un DTO de respuesta de apertura.
	 * 
	 * @param caja Entidad de caja persistida.
	 * @return DTO con la información resumida de la apertura.
	 */
	public CashRegisterOpenResponseDTO toOpenDTO(Caja caja) {
		return new CashRegisterOpenResponseDTO(
			caja.getUsuarioApertura().getNombre(),
			caja.getSaldoInicial(),
			caja.getFechaApertura()
		);
	}
	
	/**
	 * Transforma una entidad Caja en un DTO de respuesta de cierre.
	 * 
	 * @param caja Entidad de caja con información de cierre.
	 * @return DTO con los detalles finales del turno de caja.
	 */
	public CashRegisterCloseResponseDTO toCloseDTO(Caja caja) {
		return new CashRegisterCloseResponseDTO(
			caja.getUsuarioCierre().getNombre(),
			caja.getSaldoFinal(),
			caja.getFechaCierre()
		);
	}
	
}
