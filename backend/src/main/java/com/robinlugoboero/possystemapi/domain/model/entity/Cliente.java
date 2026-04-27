package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "Cliente")
public class Cliente implements Serializable {

  private static final long serialVersionUID = 3304926103L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_cliente")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private String telefono;

  @Column(name = "limite_credito", nullable = false)
  private BigDecimal limiteCredito;

  @Column(nullable = false)
  private boolean activo;

  public Cliente() {}

  public Cliente(
    Long id,
    String nombre,
    String telefono,
    BigDecimal limiteCredito,
    boolean activo
  ) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.limiteCredito = limiteCredito;
    this.activo = activo;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNombre() {
    return this.nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getTelefono() {
    return this.telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }

  public BigDecimal getLimiteCredito() {
    return this.limiteCredito;
  }

  public void setLimiteCredito(BigDecimal limiteCredito) {
    this.limiteCredito = limiteCredito;
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
