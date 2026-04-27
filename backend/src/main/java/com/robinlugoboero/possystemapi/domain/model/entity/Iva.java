package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "IVA")
public class Iva implements Serializable {

  private static final long serialVersionUID = 2480678560L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_iva")
  private Long id;

  @Column(nullable = false)
  private String descripcion;

  @Column(nullable = false)
  private BigDecimal porcentaje;

  public Iva() {}

  public Iva(Long id, String descripcion, BigDecimal porcentaje) {
    this.id = id;
    this.descripcion = descripcion;
    this.porcentaje = porcentaje;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescripcion() {
    return this.descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public BigDecimal getPorcentaje() {
    return this.porcentaje;
  }

  public void setPorcentaje(BigDecimal porcentaje) {
    this.porcentaje = porcentaje;
  }
}
