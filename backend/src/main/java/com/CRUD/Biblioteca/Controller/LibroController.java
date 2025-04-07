package com.CRUD.Biblioteca.Controller;

import com.CRUD.Biblioteca.Exception.ResourceNotFoundException;
import com.CRUD.Biblioteca.Model.Libro;
import com.CRUD.Biblioteca.Service.GeneroLiterarioService;
import com.CRUD.Biblioteca.Service.LibroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/libro")
public class LibroController {

    private final GeneroLiterarioService generoLiterarioService;
    private final LibroService libroService;

    public LibroController(GeneroLiterarioService generoLiterarioService, LibroService libroService) {
        this.generoLiterarioService = generoLiterarioService;
        this.libroService = libroService;
    }

    @GetMapping("/generos-ordenados")
    public ResponseEntity<List<Map<String, Object>>> getGenerosOrdenadosPorLibros() {
        return ResponseEntity.ok(generoLiterarioService.obtenerGenerosOrdenadosPorLibros());
    }

    @GetMapping("/listarLibros")
    public ResponseEntity<List<Libro>> obtenerLibros() {
        return ResponseEntity.ok(libroService.findAll());
    }

    @PostMapping("/crearLibro")
    public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro) {
        return ResponseEntity.ok(libroService.save(libro));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> getLibroById(@PathVariable Integer id) {
        return libroService.findById(id).map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado con ID: " + id));
    }

    @GetMapping("/filtrar_libros")
    public ResponseEntity<List<Libro>> filtrarLibros(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(defaultValue = "") String genero
    ) {
        List<Libro> libros = libroService.Filtro_libros(nombre, genero);
        return ResponseEntity.ok(libros);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizarLibro(
            @PathVariable Integer id,
            @RequestBody Libro libroActualizado) {

        Libro libro = libroService.actualizarLibro(id, libroActualizado);
        return ResponseEntity.ok(libro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Libro> deleteLibro(@PathVariable Integer id) {
        if(!libroService.existsById(id)) {
            throw new ResourceNotFoundException("Libro no encontrado con ID: " + id);
        }
        Libro libro = libroService.getById(id);
        libroService.deleteById(id);
        return ResponseEntity.ok(libro);
    }
}
