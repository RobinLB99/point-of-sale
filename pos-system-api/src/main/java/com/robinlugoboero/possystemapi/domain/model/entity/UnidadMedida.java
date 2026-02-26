package com.robinlugoboero.possystemapi.domain.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "UnidadMedida")
public class UnidadMedida implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_unidad")
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private String simbolo;
}
