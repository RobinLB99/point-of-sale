package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "Producto")
public class Producto implements Serializable {

  private static final long serialVersionUID = -3977482488L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_producto")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_categoria")
  private Categoria categoria;

  @Column(nullable = false)
  private BigDecimal costo;

  @Column(nullable = false)
  private BigDecimal stock;

  @Column(name = "es_fraccionable", nullable = false)
  private boolean esFraccionable;

  @Column(nullable = false)
  private boolean activo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_unidad_base", nullable = false)
  private UnidadMedida unidadBase;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_iva", nullable = false)
  private Iva iva;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_proveedor")
  private Proveedor proveedor;

  public Producto() {}

  public Producto(
    Long id,
    String nombre,
    Categoria categoria,
    BigDecimal costo,
    BigDecimal stock,
    boolean esFraccionable,
    boolean activo,
    UnidadMedida unidadBase,
    Iva iva,
    Proveedor proveedor
  ) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.costo = costo;
    this.stock = stock;
    this.esFraccionable = esFraccionable;
    this.activo = activo;
    this.unidadBase = unidadBase;
    this.iva = iva;
    this.proveedor = proveedor;
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

  public Categoria getCategoria() {
    return this.categoria;
  }

  public void setCategoria(Categoria categoria) {
    this.categoria = categoria;
  }

  public BigDecimal getCosto() {
    return this.costo;
  }

  public void setCosto(BigDecimal costo) {
    this.costo = costo;
  }

  public BigDecimal getStock() {
    return this.stock;
  }

  public void setStock(BigDecimal stock) {
    this.stock = stock;
  }

  public boolean isEsFraccionable() {
    return this.esFraccionable;
  }

  public boolean getEsFraccionable() {
    return this.esFraccionable;
  }

  public void setEsFraccionable(boolean esFraccionable) {
    this.esFraccionable = esFraccionable;
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

  public UnidadMedida getUnidadBase() {
    return this.unidadBase;
  }

  public void setUnidadBase(UnidadMedida unidadBase) {
    this.unidadBase = unidadBase;
  }

  public Iva getIva() {
    return this.iva;
  }

  public void setIva(Iva iva) {
    this.iva = iva;
  }

  public Proveedor getProveedor() {
    return this.proveedor;
  }

  public void setProveedor(Proveedor proveedor) {
    this.proveedor = proveedor;
  }
}
