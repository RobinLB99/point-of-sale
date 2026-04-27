package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "ProductoUnidad")
public class ProductoUnidad implements Serializable {

  private static final long serialVersionUID = -6552213602L;

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

  public ProductoUnidad() {}

  public ProductoUnidad(
    Long id,
    Producto producto,
    UnidadMedida unidad,
    BigDecimal factorConversion,
    BigDecimal precioVenta,
    boolean activo
  ) {
    this.id = id;
    this.producto = producto;
    this.unidad = unidad;
    this.factorConversion = factorConversion;
    this.precioVenta = precioVenta;
    this.activo = activo;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Producto getProducto() {
    return this.producto;
  }

  public void setProducto(Producto producto) {
    this.producto = producto;
  }

  public UnidadMedida getUnidad() {
    return this.unidad;
  }

  public void setUnidad(UnidadMedida unidad) {
    this.unidad = unidad;
  }

  public BigDecimal getFactorConversion() {
    return this.factorConversion;
  }

  public void setFactorConversion(BigDecimal factorConversion) {
    this.factorConversion = factorConversion;
  }

  public BigDecimal getPrecioVenta() {
    return this.precioVenta;
  }

  public void setPrecioVenta(BigDecimal precioVenta) {
    this.precioVenta = precioVenta;
  }

  public boolean isActivo() {
    return this.activo;
  }

  public boolean getActivo() {
    return this.activo;
  }

  public void setActivo(boolean activo) {
    this.activo = activo;
  }
}
