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
@Table(name = "ProductoUnidad")
public class ProductoUnidad implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_producto_unidad")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_producto", nullable = false)
  private Producto producto;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_unidad", nullable = false)
  private UnidadMedida unidad;

  @Column(name = "factor_conversion", nullable = false)
  private BigDecimal factorConversion;

  @Column(name = "precio_venta", nullable = false)
  private BigDecimal precioVenta;

  @Column(nullable = false)
  private boolean activo;
}
