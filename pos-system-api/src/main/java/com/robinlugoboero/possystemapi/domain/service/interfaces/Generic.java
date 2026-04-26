package com.robinlugoboero.possystemapi.domain.service.interfaces;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface Generic<E> {
	
	public E save(E entity);
	
	public void delete(Long id);
	
	public E find(Long id);
	
	public List<E> findAll();
	
	public Page<E> getPaginated(Pageable pageable);
	
}
