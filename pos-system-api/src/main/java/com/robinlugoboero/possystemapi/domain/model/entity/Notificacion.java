package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.RolDestinoNotif;
import com.robinlugoboero.possystemapi.domain.model.enums.TipoNotificacion;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Notificacion")
public class Notificacion implements Serializable {

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
}
