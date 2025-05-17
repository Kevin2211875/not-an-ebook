package com.CRUD.Biblioteca.Repository;

import com.CRUD.Biblioteca.Model.DetalleCarrito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, Integer> {


}
