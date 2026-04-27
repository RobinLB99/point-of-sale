package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;

@Entity
@Table(name = "NotificacionUsuario")
public class NotificacionUsuario implements Serializable {

  private static final long serialVersionUID = 1858764959L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_notificacion", nullable = false)
  private Notificacion notificacion;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  @Column(nullable = false)
  private boolean leida;

  @Column(name = "fecha_lectura")
  private OffsetDateTime fechaLectura;

  public NotificacionUsuario() {}

  public NotificacionUsuario(
    Long id,
    Notificacion notificacion,
    Usuario usuario,
    boolean leida,
    OffsetDateTime fechaLectura
  ) {
    this.id = id;
    this.notificacion = notificacion;
    this.usuario = usuario;
    this.leida = leida;
    this.fechaLectura = fechaLectura;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Notificacion getNotificacion() {
    return this.notificacion;
  }

  public void setNotificacion(Notificacion notificacion) {
    this.notificacion = notificacion;
  }

  public Usuario getUsuario() {
    return this.usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }

  public boolean isLeida() {
    return this.leida;
  }

  public boolean getLeida() {
    return this.leida;
  }

  public void setLeida(boolean leida) {
    this.leida = leida;
  }

  public OffsetDateTime getFechaLectura() {
    return this.fechaLectura;
  }

  public void setFechaLectura(OffsetDateTime fechaLectura) {
    this.fechaLectura = fechaLectura;
  }
}
