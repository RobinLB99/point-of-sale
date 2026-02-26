package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.EstadoCaja;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Caja")
public class Caja implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_caja")
  private Long id;

  @Column(name = "fecha_apertura", nullable = false, updatable = false)
  private OffsetDateTime fechaApertura;

  @Column(name = "fecha_cierre")
  private OffsetDateTime fechaCierre;

  @Column(name = "saldo_inicial", nullable = false)
  private BigDecimal saldoInicial;

  @Column(name = "saldo_final")
  private BigDecimal saldoFinal;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private EstadoCaja estado;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario_apertura", nullable = false)
  private Usuario usuarioApertura;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario_cierre")
  private Usuario usuarioCierre;
}
