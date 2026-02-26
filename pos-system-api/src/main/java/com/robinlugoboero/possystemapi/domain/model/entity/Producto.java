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
@Table(name = "Producto")
public class Producto implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_producto")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_categoria")
  private Categoria categoria;

  @Column(nullable = false)
  private BigDecimal costo;

  @Column(nullable = false)
  private BigDecimal stock;

  @Column(name = "es_fraccionable", nullable = false)
  private boolean esFraccionable;

  @Column(nullable = false)
  private boolean activo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_unidad_base", nullable = false)
  private UnidadMedida unidadBase;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_iva", nullable = false)
  private Iva iva;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_proveedor")
  private Proveedor proveedor;
}
