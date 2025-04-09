package com.CRUD.Biblioteca.Repository;


import com.CRUD.Biblioteca.Model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepository extends JpaRepository<Carrito, Integer> {
}
