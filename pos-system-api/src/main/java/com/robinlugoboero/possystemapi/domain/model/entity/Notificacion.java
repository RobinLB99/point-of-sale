package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.RolDestinoNotif;
import com.robinlugoboero.possystemapi.domain.model.enums.TipoNotificacion;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;

@Entity
@Table(name = "Notificacion")
public class Notificacion implements Serializable {

  private static final long serialVersionUID = 7012013866L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_notificacion")
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TipoNotificacion tipo;

  @Column(nullable = false)
  private String mensaje;

  @Enumerated(EnumType.STRING)
  @Column(name = "rol_destino", nullable = false)
  private RolDestinoNotif rolDestino;

  @Column(name = "id_referencia")
  private Long idReferencia;

  @Column(name = "tabla_referencia")
  private String tablaReferencia;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  public Notificacion() {}

  public Notificacion(
    Long id,
    TipoNotificacion tipo,
    String mensaje,
    RolDestinoNotif rolDestino,
    Long idReferencia,
    String tablaReferencia,
    OffsetDateTime fecha
  ) {
    this.id = id;
    this.tipo = tipo;
    this.mensaje = mensaje;
    this.rolDestino = rolDestino;
    this.idReferencia = idReferencia;
    this.tablaReferencia = tablaReferencia;
    this.fecha = fecha;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public TipoNotificacion getTipo() {
    return this.tipo;
  }

  public void setTipo(TipoNotificacion tipo) {
    this.tipo = tipo;
  }

  public String getMensaje() {
    return this.mensaje;
  }

  public void setMensaje(String mensaje) {
    this.mensaje = mensaje;
  }

  public RolDestinoNotif getRolDestino() {
    return this.rolDestino;
  }

  public void setRolDestino(RolDestinoNotif rolDestino) {
    this.rolDestino = rolDestino;
  }

  public Long getIdReferencia() {
    return this.idReferencia;
  }

  public void setIdReferencia(Long idReferencia) {
    this.idReferencia = idReferencia;
  }

  public String getTablaReferencia() {
    return this.tablaReferencia;
  }

  public void setTablaReferencia(String tablaReferencia) {
    this.tablaReferencia = tablaReferencia;
  }

  public OffsetDateTime getFecha() {
    return this.fecha;
  }

  public void setFecha(OffsetDateTime fecha) {
    this.fecha = fecha;
  }
}
