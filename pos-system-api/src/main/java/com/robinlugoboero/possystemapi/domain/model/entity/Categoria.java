package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Categoria")
public class Categoria implements Serializable {

  private static final long serialVersionUID = 7438433504L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_categoria")
  private Long id;

  @Column(nullable = false, unique = true)
  private String nombre;

  private String descripcion;

  public Categoria() {}

  public Categoria(Long id, String nombre, String descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
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

  public String getDescripcion() {
    return this.descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }
}
