package com.robinlugoboero.possystemapi.domain.service.interfaces;

import java.util.List;

public interface Generic<E> {
	
	public E save(E entity);
	
	public void delete(Long id);
	
	public E find(Long id);
	
	public List<E> findAll();
}
