package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Cliente")
public class Cliente implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_cliente")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private String telefono;

  @Column(name = "limite_credito", nullable = false)
  private BigDecimal limiteCredito;

  @Column(nullable = false)
  private boolean activo;
}
