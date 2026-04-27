package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "UnidadMedida")
public class UnidadMedida implements Serializable {

  private static final long serialVersionUID = -7213359071L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_unidad")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private String simbolo;

  public UnidadMedida() {}

  public UnidadMedida(Long id, String nombre, String simbolo) {
    this.id = id;
    this.nombre = nombre;
    this.simbolo = simbolo;
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

  public String getSimbolo() {
    return this.simbolo;
  }

  public void setSimbolo(String simbolo) {
    this.simbolo = simbolo;
  }
}
