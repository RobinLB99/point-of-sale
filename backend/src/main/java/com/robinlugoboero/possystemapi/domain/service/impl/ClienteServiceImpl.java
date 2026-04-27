package com.robinlugoboero.possystemapi.domain.service.impl;

import com.robinlugoboero.possystemapi.domain.model.entity.Cliente;
import com.robinlugoboero.possystemapi.domain.repository.ClienteRepository;
import com.robinlugoboero.possystemapi.domain.service.interfaces.ClienteService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl extends AbstractGenericService<Cliente, ClienteRepository> implements ClienteService {
    public ClienteServiceImpl(ClienteRepository repository) {
        super(repository);
    }

	@Override
	public Page<Cliente> getPaginated(Pageable pageable) {
		return repository.findAll(pageable);
	}
}
