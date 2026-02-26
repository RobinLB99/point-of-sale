package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.AccionAuditoria;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Auditoria")
public class Auditoria implements Serializable {

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
}
