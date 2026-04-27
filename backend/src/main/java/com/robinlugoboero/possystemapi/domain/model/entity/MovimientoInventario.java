package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.TipoMovimientoInv;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "MovimientoInventario")
public class MovimientoInventario implements Serializable {

  private static final long serialVersionUID = 1897119269L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_movimiento")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_producto", nullable = false)
  private Producto producto;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TipoMovimientoInv tipo;

  @Column(nullable = false)
  private BigDecimal cantidad;

  @Column(name = "stock_anterior", nullable = false)
  private BigDecimal stockAnterior;

  @Column(name = "stock_nuevo", nullable = false)
  private BigDecimal stockNuevo;

  private String referencia;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  public MovimientoInventario() {}

  public MovimientoInventario(
    Long id,
    Producto producto,
    TipoMovimientoInv tipo,
    BigDecimal cantidad,
    BigDecimal stockAnterior,
    BigDecimal stockNuevo,
    String referencia,
    OffsetDateTime fecha,
    Usuario usuario
  ) {
    this.id = id;
    this.producto = producto;
    this.tipo = tipo;
    this.cantidad = cantidad;
    this.stockAnterior = stockAnterior;
    this.stockNuevo = stockNuevo;
    this.referencia = referencia;
    this.fecha = fecha;
    this.usuario = usuario;
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

  public TipoMovimientoInv getTipo() {
    return this.tipo;
  }

  public void setTipo(TipoMovimientoInv tipo) {
    this.tipo = tipo;
  }

  public BigDecimal getCantidad() {
    return this.cantidad;
  }

  public void setCantidad(BigDecimal cantidad) {
    this.cantidad = cantidad;
  }

  public BigDecimal getStockAnterior() {
    return this.stockAnterior;
  }

  public void setStockAnterior(BigDecimal stockAnterior) {
    this.stockAnterior = stockAnterior;
  }

  public BigDecimal getStockNuevo() {
    return this.stockNuevo;
  }

  public void setStockNuevo(BigDecimal stockNuevo) {
    this.stockNuevo = stockNuevo;
  }

  public String getReferencia() {
    return this.referencia;
  }

  public void setReferencia(String referencia) {
    this.referencia = referencia;
  }

  public OffsetDateTime getFecha() {
    return this.fecha;
  }

  public void setFecha(OffsetDateTime fecha) {
    this.fecha = fecha;
  }

  public Usuario getUsuario() {
    return this.usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }
}
