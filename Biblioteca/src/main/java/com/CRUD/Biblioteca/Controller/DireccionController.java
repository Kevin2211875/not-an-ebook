package com.CRUD.Biblioteca.Controller;

import com.CRUD.Biblioteca.DTO.DireccionDTO;
import com.CRUD.Biblioteca.Exception.ResourceNotFoundException;
import com.CRUD.Biblioteca.Model.Direccion;
import com.CRUD.Biblioteca.Model.Usuario;
import com.CRUD.Biblioteca.Repository.UsuarioRepository;
import com.CRUD.Biblioteca.Service.DireccionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/direccion")
public class DireccionController {

    private final DireccionService direccionService;
    private final UsuarioRepository usuarioRepository;

    public DireccionController(DireccionService direccionService, UsuarioRepository usuarioRepository) {
        this.direccionService = direccionService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Direccion>> obtenerDireccionesPorUsuario(@PathVariable Integer idUsuario) {
        List<Direccion> direcciones = direccionService.findAllByUsuarioId(idUsuario);

        if (direcciones.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.emptyList()); // o podrías devolver un mensaje personalizado
        }

        return ResponseEntity.ok(direcciones);
    }
    @GetMapping("/listarDirecciones")
    public ResponseEntity<?> obtenerDirecciones(@RequestHeader("Authorization") String token) {
        List<Direccion> direcciones = direccionService.findAll();
        List<DireccionDTO> direccionesDTO = direcciones.stream()
                .map(DireccionDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(direccionesDTO);
    }


    @PostMapping("/ingresarDireccion")
    public ResponseEntity<Direccion> ingresarDireccion(@RequestBody Direccion direccion, @RequestHeader("Authorization") String token) {
        Integer idUsuario = direccion.getUsuario().getId();
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + idUsuario));

        direccion.setUsuario(usuario); // Asegura que esté bien persistido
        return ResponseEntity.ok(direccionService.save(direccion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Direccion> updateDireccion(@PathVariable Integer id, @RequestBody Direccion direccion
    , @RequestHeader("Authorization") String token) {
        return direccionService.findById(id).
                map(p -> {
                    direccion.setId(id);
                    return ResponseEntity.ok(direccionService.save(direccion));
                }).orElseThrow(() -> new ResourceNotFoundException("Direccion no encontrada con id: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Direccion> deleteDireccion(@PathVariable Integer id
    , @RequestHeader("Authorization") String token) {
        if(!direccionService.existsById(id)) {
            throw new ResourceNotFoundException("Direccion no encontrado con ID: " + id);
        }
        Direccion direccion = direccionService.findById(id).orElse(null);
        direccionService.deleteById(id);
        return ResponseEntity.ok(direccion);
    }
}
