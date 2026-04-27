package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "DetalleVenta")
public class DetalleVenta implements Serializable {

  private static final long serialVersionUID = 129211225L;

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

  public DetalleVenta() {}

  public DetalleVenta(
    Long id,
    Venta venta,
    Producto producto,
    ProductoUnidad productoUnidad,
    BigDecimal cantidad,
    BigDecimal cantidadBase,
    BigDecimal precioUnitario,
    BigDecimal costoUnitario,
    BigDecimal ivaPorcentaje,
    BigDecimal totalLinea
  ) {
    this.id = id;
    this.venta = venta;
    this.producto = producto;
    this.productoUnidad = productoUnidad;
    this.cantidad = cantidad;
    this.cantidadBase = cantidadBase;
    this.precioUnitario = precioUnitario;
    this.costoUnitario = costoUnitario;
    this.ivaPorcentaje = ivaPorcentaje;
    this.totalLinea = totalLinea;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Venta getVenta() {
    return this.venta;
  }

  public void setVenta(Venta venta) {
    this.venta = venta;
  }

  public Producto getProducto() {
    return this.producto;
  }

  public void setProducto(Producto producto) {
    this.producto = producto;
  }

  public ProductoUnidad getProductoUnidad() {
    return this.productoUnidad;
  }

  public void setProductoUnidad(ProductoUnidad productoUnidad) {
    this.productoUnidad = productoUnidad;
  }

  public BigDecimal getCantidad() {
    return this.cantidad;
  }

  public void setCantidad(BigDecimal cantidad) {
    this.cantidad = cantidad;
  }

  public BigDecimal getCantidadBase() {
    return this.cantidadBase;
  }

  public void setCantidadBase(BigDecimal cantidadBase) {
    this.cantidadBase = cantidadBase;
  }

  public BigDecimal getPrecioUnitario() {
    return this.precioUnitario;
  }

  public void setPrecioUnitario(BigDecimal precioUnitario) {
    this.precioUnitario = precioUnitario;
  }

  public BigDecimal getCostoUnitario() {
    return this.costoUnitario;
  }

  public void setCostoUnitario(BigDecimal costoUnitario) {
    this.costoUnitario = costoUnitario;
  }

  public BigDecimal getIvaPorcentaje() {
    return this.ivaPorcentaje;
  }

  public void setIvaPorcentaje(BigDecimal ivaPorcentaje) {
    this.ivaPorcentaje = ivaPorcentaje;
  }

  public BigDecimal getTotalLinea() {
    return this.totalLinea;
  }

  public void setTotalLinea(BigDecimal totalLinea) {
    this.totalLinea = totalLinea;
  }
}
