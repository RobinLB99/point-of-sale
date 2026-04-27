package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.service.interfaces.Generic;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class AbstractGenericService<
  E,
  R extends JpaRepository<E, Long>
> implements Generic<E> {

  protected final R repository;

  protected AbstractGenericService(R repository) {
    this.repository = repository;
  }

  @Override
  public E save(E entity) {
    return repository.save(entity);
  }

  @Override
  public void delete(Long id) {
    repository.deleteById(id);
  }

  @Override
  public E find(Long id) {
    return repository.findById(id).orElse(null);
  }

  @Override
  public List<E> findAll() {
    return repository.findAll();
  }
}
