package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.RolUsuario;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Set;

@Entity
@Table(name = "Usuario")
public class Usuario implements Serializable {

  private static final long serialVersionUID = 3240896012L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_usuario")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false, unique = true)
  private String usuario;

  @Column(nullable = false)
  private String password;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
    name = "Usuario_Rol",
    joinColumns = @JoinColumn(name = "id_usuario")
  )
  @Enumerated(EnumType.STRING)
  @Column(name = "rol")
  private Set<RolUsuario> roles;

  @Column(nullable = false)
  private boolean activo;

  @Column(name = "fecha_registro", nullable = false, updatable = false)
  private OffsetDateTime fechaRegistro;

  public Usuario() {}

  public Usuario(
    Long id,
    String nombre,
    String usuario,
    String password,
    Set<RolUsuario> roles,
    boolean activo,
    OffsetDateTime fechaRegistro
  ) {
    this.id = id;
    this.nombre = nombre;
    this.usuario = usuario;
    this.password = password;
    this.roles = roles;
    this.activo = activo;
    this.fechaRegistro = fechaRegistro;
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

  public String getUsuario() {
    return this.usuario;
  }

  public void setUsuario(String usuario) {
    this.usuario = usuario;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<RolUsuario> getRoles() {
    return this.roles;
  }

  public void setRoles(Set<RolUsuario> roles) {
    this.roles = roles;
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

  public OffsetDateTime getFechaRegistro() {
    return this.fechaRegistro;
  }

  public void setFechaRegistro(OffsetDateTime fechaRegistro) {
    this.fechaRegistro = fechaRegistro;
  }
}
