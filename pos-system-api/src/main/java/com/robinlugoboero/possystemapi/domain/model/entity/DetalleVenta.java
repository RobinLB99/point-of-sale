package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DetalleVenta")
public class DetalleVenta implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_detalle")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_venta", nullable = false)
  private Venta venta;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_producto", nullable = false)
  private Producto producto;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_producto_unidad", nullable = false)
  private ProductoUnidad productoUnidad;

  @Column(nullable = false)
  private BigDecimal cantidad;

  @Column(name = "cantidad_base", nullable = false)
  private BigDecimal cantidadBase;

  @Column(name = "precio_unitario", nullable = false)
  private BigDecimal precioUnitario;

  @Column(name = "costo_unitario", nullable = false)
  private BigDecimal costoUnitario;

  @Column(name = "iva_porcentaje", nullable = false)
  private BigDecimal ivaPorcentaje;

  @Column(name = "total_linea", nullable = false)
  private BigDecimal totalLinea;
}
