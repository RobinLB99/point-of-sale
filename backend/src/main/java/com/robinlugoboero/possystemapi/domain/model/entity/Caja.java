package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.EstadoCaja;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "Caja")
public class Caja implements Serializable {

  private static final long serialVersionUID = 8085152075L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_caja")
  private Long id;

  @CreationTimestamp
  @Column(name = "fecha_apertura", nullable = false, updatable = false)
  private OffsetDateTime fechaApertura;

  @Column(name = "fecha_cierre")
  private OffsetDateTime fechaCierre;

  @Column(name = "saldo_inicial", nullable = false, precision = 10, scale = 2)
  private BigDecimal saldoInicial;

  @Column(name = "saldo_final", precision = 10, scale = 2)
  private BigDecimal saldoFinal;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(nullable = false)
  private EstadoCaja estado;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario_apertura", nullable = false)
  private Usuario usuarioApertura;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario_cierre")
  private Usuario usuarioCierre;

  @Column(name = "notas_apertura")
  private String notas;

  public Caja() {}

  public Caja(
    Long id,
    OffsetDateTime fechaApertura,
    OffsetDateTime fechaCierre,
    BigDecimal saldoInicial,
    BigDecimal saldoFinal,
    EstadoCaja estado,
    Usuario usuarioApertura,
    Usuario usuarioCierre,
    String notas
  ) {
    this.id = id;
    this.fechaApertura = fechaApertura;
    this.fechaCierre = fechaCierre;
    this.saldoInicial = saldoInicial;
    this.saldoFinal = saldoFinal;
    this.estado = estado;
    this.usuarioApertura = usuarioApertura;
    this.usuarioCierre = usuarioCierre;
    this.notas = notas;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public OffsetDateTime getFechaApertura() {
    return this.fechaApertura;
  }

  public void setFechaApertura(OffsetDateTime fechaApertura) {
    this.fechaApertura = fechaApertura;
  }

  public OffsetDateTime getFechaCierre() {
    return this.fechaCierre;
  }

  public void setFechaCierre(OffsetDateTime fechaCierre) {
    this.fechaCierre = fechaCierre;
  }

  public BigDecimal getSaldoInicial() {
    return this.saldoInicial;
  }

  public void setSaldoInicial(BigDecimal saldoInicial) {
    this.saldoInicial = saldoInicial;
  }

  public BigDecimal getSaldoFinal() {
    return this.saldoFinal;
  }

  public void setSaldoFinal(BigDecimal saldoFinal) {
    this.saldoFinal = saldoFinal;
  }

  public EstadoCaja getEstado() {
    return this.estado;
  }

  public void setEstado(EstadoCaja estado) {
    this.estado = estado;
  }

  public Usuario getUsuarioApertura() {
    return this.usuarioApertura;
  }

  public void setUsuarioApertura(Usuario usuarioApertura) {
    this.usuarioApertura = usuarioApertura;
  }

  public Usuario getUsuarioCierre() {
    return this.usuarioCierre;
  }

  public void setUsuarioCierre(Usuario usuarioCierre) {
    this.usuarioCierre = usuarioCierre;
  }

  public String getNotas() {
    return this.notas;
  }

  public void setNotas(String notas) {
    this.notas = notas;
  }
}
