package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "Pago")
public class Pago implements Serializable {

  private static final long serialVersionUID = -513954711L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_pago")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_venta", nullable = false)
  private Venta venta;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_caja", nullable = false)
  private Caja caja;

  @Column(nullable = false)
  private BigDecimal monto;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  private String observacion;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  public Pago() {}

  public Pago(
    Long id,
    Venta venta,
    Caja caja,
    BigDecimal monto,
    OffsetDateTime fecha,
    String observacion,
    Usuario usuario
  ) {
    this.id = id;
    this.venta = venta;
    this.caja = caja;
    this.monto = monto;
    this.fecha = fecha;
    this.observacion = observacion;
    this.usuario = usuario;
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

  public Caja getCaja() {
    return this.caja;
  }

  public void setCaja(Caja caja) {
    this.caja = caja;
  }

  public BigDecimal getMonto() {
    return this.monto;
  }

  public void setMonto(BigDecimal monto) {
    this.monto = monto;
  }

  public OffsetDateTime getFecha() {
    return this.fecha;
  }

  public void setFecha(OffsetDateTime fecha) {
    this.fecha = fecha;
  }

  public String getObservacion() {
    return this.observacion;
  }

  public void setObservacion(String observacion) {
    this.observacion = observacion;
  }

  public Usuario getUsuario() {
    return this.usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }
}
