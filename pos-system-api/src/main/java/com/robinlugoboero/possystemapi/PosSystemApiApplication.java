package com.robinlugoboero.possystemapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;

@SpringBootApplication
@EntityScan("com.robinlugoboero.possystemapi.domain.model.entity")
public class PosSystemApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(PosSystemApiApplication.class, args);
  }
}
