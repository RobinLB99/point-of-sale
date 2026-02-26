package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.TipoMovimientoCaja;
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
@Table(name = "MovimientoCaja")
public class MovimientoCaja implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_movimiento")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_caja", nullable = false)
  private Caja caja;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TipoMovimientoCaja tipo;

  private String descripcion;

  @Column(nullable = false)
  private BigDecimal monto;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;
}
