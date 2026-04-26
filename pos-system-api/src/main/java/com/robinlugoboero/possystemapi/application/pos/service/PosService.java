package com.robinlugoboero.possystemapi.application.pos.service;

import com.robinlugoboero.possystemapi.application.pos.dto.ProductoResponseDTO;
import com.robinlugoboero.possystemapi.application.pos.mapper.ProductoMapper;
import com.robinlugoboero.possystemapi.domain.service.impl.ProductoServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PosService {

  private ProductoServiceImpl productoService;
  private ProductoMapper mapper;

  public Page<ProductoResponseDTO> obtenerProductosPaginados(
    String nombre,
    Pageable pageable
  ) {
    return productoService
      .buscarPorNombreIgnorandoCase(nombre, pageable)
      .map(producto -> mapper.toDTO(producto));
  }
}
