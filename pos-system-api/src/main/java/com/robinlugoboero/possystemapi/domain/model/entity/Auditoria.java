package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.AccionAuditoria;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;

@Entity
@Table(name = "Auditoria")
public class Auditoria implements Serializable {

  private static final long serialVersionUID = 1902462194L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_auditoria")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AccionAuditoria accion;

  @Column(nullable = false)
  private String tabla;

  @Column(name = "id_registro")
  private Long idRegistro;

  @Column(name = "valor_anterior", columnDefinition = "JSONB")
  private String valorAnterior;

  @Column(name = "valor_nuevo", columnDefinition = "JSONB")
  private String valorNuevo;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  public Auditoria() {}

  public Auditoria(
    Long id,
    Usuario usuario,
    AccionAuditoria accion,
    String tabla,
    Long idRegistro,
    String valorAnterior,
    String valorNuevo,
    OffsetDateTime fecha
  ) {
    this.id = id;
    this.usuario = usuario;
    this.accion = accion;
    this.tabla = tabla;
    this.idRegistro = idRegistro;
    this.valorAnterior = valorAnterior;
    this.valorNuevo = valorNuevo;
    this.fecha = fecha;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Usuario getUsuario() {
    return this.usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }

  public AccionAuditoria getAccion() {
    return this.accion;
  }

  public void setAccion(AccionAuditoria accion) {
    this.accion = accion;
  }

  public String getTabla() {
    return this.tabla;
  }

  public void setTabla(String tabla) {
    this.tabla = tabla;
  }

  public Long getIdRegistro() {
    return this.idRegistro;
  }

  public void setIdRegistro(Long idRegistro) {
    this.idRegistro = idRegistro;
  }

  public String getValorAnterior() {
    return this.valorAnterior;
  }

  public void setValorAnterior(String valorAnterior) {
    this.valorAnterior = valorAnterior;
  }

  public String getValorNuevo() {
    return this.valorNuevo;
  }

  public void setValorNuevo(String valorNuevo) {
    this.valorNuevo = valorNuevo;
  }

  public OffsetDateTime getFecha() {
    return this.fecha;
  }

  public void setFecha(OffsetDateTime fecha) {
    this.fecha = fecha;
  }
}
