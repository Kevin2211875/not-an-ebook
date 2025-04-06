package com.CRUD.Biblioteca.Controller;

import com.CRUD.Biblioteca.DTO.UsuarioDTO;
import com.CRUD.Biblioteca.Model.Usuario;
import com.CRUD.Biblioteca.Reponse.AuthRequest;
import com.CRUD.Biblioteca.Reponse.RegisterRequest;
import com.CRUD.Biblioteca.Reponse.TokenResponse;
import com.CRUD.Biblioteca.Reponse.UpdateUserRequest;
import com.CRUD.Biblioteca.Repository.UsuarioRepository;
import com.CRUD.Biblioteca.Service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    private final AuthService service;
    private final UsuarioRepository repository;

    public UsuarioController(AuthService service, UsuarioRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @GetMapping("/listUser")
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        List<UsuarioDTO> usuarios = repository.findAll().stream()
                .map(UsuarioDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }


    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody RegisterRequest request) {
        final TokenResponse response = service.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> authenticate(@RequestBody AuthRequest request) {
        final TokenResponse response = service.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public TokenResponse refreshToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
    ) {
        return service.refreshToken(authentication);
    }

    @PutMapping("/update")
    public ResponseEntity<TokenResponse> updateUser(
            @RequestBody UpdateUserRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        TokenResponse response = service.update(request, authHeader);
        return ResponseEntity.ok(response);
    }

}
