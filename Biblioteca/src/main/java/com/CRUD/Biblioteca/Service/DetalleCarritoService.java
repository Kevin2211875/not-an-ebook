package com.CRUD.Biblioteca.Service;

import com.CRUD.Biblioteca.Model.DetalleCarrito;
import com.CRUD.Biblioteca.Repository.DetalleCarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class DetalleCarritoService implements DetalleCarritoRepository {

    @Autowired
    private DetalleCarritoRepository detalleCarritoRepository;

    @Override
    public void flush() {

    }

    @Override
    public <S extends DetalleCarrito> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends DetalleCarrito> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<DetalleCarrito> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public DetalleCarrito getOne(Integer integer) {
        return null;
    }

    @Override
    public DetalleCarrito getById(Integer integer) {
        return null;
    }

    @Override
    public DetalleCarrito getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends DetalleCarrito> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends DetalleCarrito> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends DetalleCarrito> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends DetalleCarrito> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends DetalleCarrito> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends DetalleCarrito> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends DetalleCarrito, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends DetalleCarrito> S save(S entity) {
        return detalleCarritoRepository.save(entity);
    }

    @Override
    public <S extends DetalleCarrito> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<DetalleCarrito> findById(Integer integer) {
        return detalleCarritoRepository.findById(integer);
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public List<DetalleCarrito> findAll() {
        return List.of();
    }

    @Override
    public List<DetalleCarrito> findAllById(Iterable<Integer> integers) {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {
        detalleCarritoRepository.deleteById(integer);
    }

    @Override
    public void delete(DetalleCarrito entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends DetalleCarrito> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<DetalleCarrito> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<DetalleCarrito> findAll(Pageable pageable) {
        return null;
    }
}
