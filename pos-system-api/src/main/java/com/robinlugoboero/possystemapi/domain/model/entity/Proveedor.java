package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Proveedor")
public class Proveedor implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_proveedor")
  private Long id;

  @Column(nullable = false)
  private String empresa;

  @Column(nullable = false)
  private String vendedor;

  @Column(nullable = false)
  private String telefono;

  @Column(name = "dia_visita", nullable = false)
  private String diaVisita;

  @Column(nullable = false)
  private boolean activo;
}
