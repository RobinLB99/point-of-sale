package com.robinlugoboero.possystemapi.application.pos.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.robinlugoboero.possystemapi.application.pos.dto.ProductoResponseDTO;
import com.robinlugoboero.possystemapi.application.pos.service.PosService;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@AllArgsConstructor
@RestController
@RequestMapping("/pos")
public class PosController {
	
	private PosService posService;

	@GetMapping("path")
	public ResponseEntity<Page<ProductoResponseDTO>> obtenerProductosPorNombrePaginados(
		@PageableDefault(size = 24, sort = "categoria") Pageable pageable,
		@RequestParam String nombre
	) {
		return ResponseEntity.ok(
			posService.obtenerProductosPaginados(nombre, pageable)
		);
	}
	
	
}
