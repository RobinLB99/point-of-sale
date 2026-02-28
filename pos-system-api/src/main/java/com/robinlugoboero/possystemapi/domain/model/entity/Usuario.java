package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.RolUsuario;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Set;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Usuario")
public class Usuario implements Serializable {

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
}
