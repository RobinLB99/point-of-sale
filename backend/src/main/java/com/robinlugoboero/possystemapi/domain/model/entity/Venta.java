package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.EstadoVenta;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "Venta")
public class Venta implements Serializable {

  private static final long serialVersionUID = -6119459973L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_venta")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_cliente")
  private Cliente cliente;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_caja", nullable = false)
  private Caja caja;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  @Column(nullable = false)
  private BigDecimal subtotal;

  @Column(nullable = false)
  private BigDecimal impuestos;

  @Column(nullable = false)
  private BigDecimal total;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private EstadoVenta estado;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  public Venta() {}

  public Venta(
    Long id,
    Cliente cliente,
    Caja caja,
    OffsetDateTime fecha,
    BigDecimal subtotal,
    BigDecimal impuestos,
    BigDecimal total,
    EstadoVenta estado,
    Usuario usuario
  ) {
    this.id = id;
    this.cliente = cliente;
    this.caja = caja;
    this.fecha = fecha;
    this.subtotal = subtotal;
    this.impuestos = impuestos;
    this.total = total;
    this.estado = estado;
    this.usuario = usuario;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Cliente getCliente() {
    return this.cliente;
  }

  public void setCliente(Cliente cliente) {
    this.cliente = cliente;
  }

  public Caja getCaja() {
    return this.caja;
  }

  public void setCaja(Caja caja) {
    this.caja = caja;
  }

  public OffsetDateTime getFecha() {
    return this.fecha;
  }

  public void setFecha(OffsetDateTime fecha) {
    this.fecha = fecha;
  }

  public BigDecimal getSubtotal() {
    return this.subtotal;
  }

  public void setSubtotal(BigDecimal subtotal) {
    this.subtotal = subtotal;
  }

  public BigDecimal getImpuestos() {
    return this.impuestos;
  }

  public void setImpuestos(BigDecimal impuestos) {
    this.impuestos = impuestos;
  }

  public BigDecimal getTotal() {
    return this.total;
  }

  public void setTotal(BigDecimal total) {
    this.total = total;
  }

  public EstadoVenta getEstado() {
    return this.estado;
  }

  public void setEstado(EstadoVenta estado) {
    this.estado = estado;
  }

  public Usuario getUsuario() {
    return this.usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }
}
