package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Proveedor")
public class Proveedor implements Serializable {

  private static final long serialVersionUID = 3327025220L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_proveedor")
  private Long id;

  @Column(nullable = false)
  private String empresa;

  @Column(nullable = false)
  private String vendedor;

  @Column(nullable = false)
  private String telefono;

  @Column(name = "dia_visita", nullable = false)
  private String diaVisita;

  @Column(nullable = false)
  private boolean activo;

  public Proveedor() {}

  public Proveedor(
    Long id,
    String empresa,
    String vendedor,
    String telefono,
    String diaVisita,
    boolean activo
  ) {
    this.id = id;
    this.empresa = empresa;
    this.vendedor = vendedor;
    this.telefono = telefono;
    this.diaVisita = diaVisita;
    this.activo = activo;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmpresa() {
    return this.empresa;
  }

  public void setEmpresa(String empresa) {
    this.empresa = empresa;
  }

  public String getVendedor() {
    return this.vendedor;
  }

  public void setVendedor(String vendedor) {
    this.vendedor = vendedor;
  }

  public String getTelefono() {
    return this.telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }

  public String getDiaVisita() {
    return this.diaVisita;
  }

  public void setDiaVisita(String diaVisita) {
    this.diaVisita = diaVisita;
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
