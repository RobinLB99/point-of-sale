package com.robinlugoboero.possystemapi.domain.model.entity;

import com.robinlugoboero.possystemapi.domain.model.enums.TipoMovimientoInv;
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
@Table(name = "MovimientoInventario")
public class MovimientoInventario implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_movimiento")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_producto", nullable = false)
  private Producto producto;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TipoMovimientoInv tipo;

  @Column(nullable = false)
  private BigDecimal cantidad;

  @Column(name = "stock_anterior", nullable = false)
  private BigDecimal stockAnterior;

  @Column(name = "stock_nuevo", nullable = false)
  private BigDecimal stockNuevo;

  private String referencia;

  @Column(nullable = false, updatable = false)
  private OffsetDateTime fecha;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;
}
