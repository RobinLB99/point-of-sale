package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.TipoMovimientoCaja;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "MovimientoCaja")
public class MovimientoCaja implements Serializable {

  private static final long serialVersionUID = 702175688L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_movimiento")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_caja", nullable = false)
  private Caja caja;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TipoMovimientoCaja tipo;

  private String descripcion;

  @Column(nullable = false)
  private BigDecimal monto;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  public MovimientoCaja() {}

  public MovimientoCaja(
    Long id,
    Caja caja,
    TipoMovimientoCaja tipo,
    String descripcion,
    BigDecimal monto,
    OffsetDateTime fecha,
    Usuario usuario
  ) {
    this.id = id;
    this.caja = caja;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.monto = monto;
    this.fecha = fecha;
    this.usuario = usuario;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Caja getCaja() {
    return this.caja;
  }

  public void setCaja(Caja caja) {
    this.caja = caja;
  }

  public TipoMovimientoCaja getTipo() {
    return this.tipo;
  }

  public void setTipo(TipoMovimientoCaja tipo) {
    this.tipo = tipo;
  }

  public String getDescripcion() {
    return this.descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
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

  public Usuario getUsuario() {
    return this.usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }
}
