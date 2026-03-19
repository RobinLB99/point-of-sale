package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.EstadoCaja;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Caja")
public class Caja implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_caja")
  private Long id;

  @CreationTimestamp
  @Column(name = "fecha_apertura", nullable = false, updatable = false)
  private OffsetDateTime fechaApertura;

  @Column(name = "fecha_cierre")
  private OffsetDateTime fechaCierre;

  @Column(name = "saldo_inicial", nullable = false, precision = 10, scale = 2)
  private BigDecimal saldoInicial;

  @Column(name = "saldo_final", precision = 10, scale = 2)
  private BigDecimal saldoFinal;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(nullable = false)
  private EstadoCaja estado;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario_apertura", nullable = false)
  private Usuario usuarioApertura;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario_cierre")
  private Usuario usuarioCierre;
  
  @Column(name = "notas_apertura")
  private String notas;
}
