package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Auditoria;
import com.robinlugoboero.possystemapi.domain.repository.AuditoriaRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.AuditoriaService;
import org.springframework.stereotype.Service;

@Service
public class AuditoriaServiceImpl
  extends AbstractGenericService<Auditoria, AuditoriaRepository>
  implements AuditoriaService
{

  public AuditoriaServiceImpl(AuditoriaRepository repository) {
    super(repository);
  }

  @Override
  public Auditoria find(Long id) {
    return super.find(id);
  }
}
