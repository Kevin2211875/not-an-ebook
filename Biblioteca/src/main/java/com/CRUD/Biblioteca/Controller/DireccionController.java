package com.CRUD.Biblioteca.Controller;

import com.CRUD.Biblioteca.DTO.DireccionDTO;
import com.CRUD.Biblioteca.Exception.ResourceNotFoundException;
import com.CRUD.Biblioteca.Model.Direccion;
import com.CRUD.Biblioteca.Service.DireccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/direccion")
public class DireccionController {

    private DireccionService direccionService;

    public DireccionController(DireccionService direccionService) {
        this.direccionService = direccionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Direccion> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(direccionService.getById(id));
    }

    @GetMapping("/listarDirecciones")
    public ResponseEntity<List<DireccionDTO>> obtenerDirecciones() {
        List<Direccion> direcciones = direccionService.findAll();
        List<DireccionDTO> direccionesDTO = direcciones.stream()
                .map(DireccionDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(direccionesDTO);
    }

    @PostMapping("/ingresarDireccion")
    public ResponseEntity<Direccion> ingresarDireccion(@RequestBody Direccion direccion) {
        return ResponseEntity.ok(direccionService.save(direccion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Direccion> updateDireccion(@PathVariable Integer id, @RequestBody Direccion direccion) {
        return direccionService.findById(id).
                map(p -> {
                    direccion.setId(id);
                    return ResponseEntity.ok(direccionService.save(direccion));
                }).orElseThrow(() -> new ResourceNotFoundException("Direccion no encontrada con id: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Direccion> deleteDireccion(@PathVariable Integer id) {
        if(!direccionService.existsById(id)) {
            throw new ResourceNotFoundException("Direccion no encontrado con ID: " + id);
        }
        Direccion direccion = direccionService.findById(id).orElse(null);
        direccionService.deleteById(id);
        return ResponseEntity.ok(direccion);
    }
}
