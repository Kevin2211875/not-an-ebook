package com.CRUD.Biblioteca.Service;

import com.CRUD.Biblioteca.Model.Venta;
import com.CRUD.Biblioteca.Repository.VentaRepository;
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
public class VentaService implements VentaRepository {

    @Autowired
    private VentaRepository ventaRepository;

    @Override
    public void flush() {

    }

    @Override
    public <S extends Venta> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Venta> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<Venta> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Venta getOne(Integer integer) {
        return null;
    }

    @Override
    public Venta getById(Integer integer) {
        return null;
    }

    @Override
    public Venta getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends Venta> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Venta> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends Venta> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends Venta> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Venta> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Venta> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Venta, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Venta> S save(S entity) {
        return ventaRepository.save(entity);
    }

    @Override
    public <S extends Venta> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<Venta> findById(Integer integer) {
        return ventaRepository.findById(integer);
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public List<Venta> findAll() {
        return ventaRepository.findAll();
    }

    @Override
    public List<Venta> findAllById(Iterable<Integer> integers) {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {
        ventaRepository.deleteById(integer);
    }

    @Override
    public void delete(Venta entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends Venta> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Venta> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<Venta> findAll(Pageable pageable) {
        return null;
    }
}
