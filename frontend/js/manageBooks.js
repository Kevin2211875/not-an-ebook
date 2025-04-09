const params = new URLSearchParams(window.location.search);
const idLibro = params.get("id");
var idPortada = "Cloudinary lo provisionará";
var token = "";

async function verificarRol() {
    //Volvemos a cargar el token
    token = localStorage.getItem("token");
    const tokenData = parseJwt(token);
    if (token == null || tokenData == null) {
        //Se fuerza el logout
        localStorage.removeItem("token"); //Se elimina porque no es valido
        window.location.href='/index.html' 
        return;
    }

    correoUsuario = tokenData.sub;
    //console.log(correoUsuario);

    const endpoint = API_URL + `/auth/listByEmail?email=${correoUsuario}`
    const fetchUsuario = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    });

    if (!fetchUsuario.ok) {
        const errorText = await fetchUsuario.text();
        console.warn("Error al obtener usuario:", fetchUsuario.status, errorText);
        window.location.href='/index.html' 
        return;
    }

    const usuario = await fetchUsuario.json();
    rol = usuario.tipoUsuario.id;
    if (rol == 2) {
        window.location.href='/index.html' 
        return;
    }
}

async function fetchGeneros() {
    const fetchGeneros = await fetch(API_URL+"/libro/generos-ordenados", {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    if (!fetchGeneros.ok) {
        const errorData = await fetchGeneros.text();
        console.log(errorData);
        return;
    }

    generosLiterarios = await fetchGeneros.json();
    addselectGeneros(generosLiterarios);
}

async function fetchLibro() {
    if (idLibro === 0) {
        return;
    }
    
    const fetchlibro = await fetch(API_URL+`/libro/${idLibro}`, {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    })

    if (!fetchlibro.ok) {
        const errorData = await fetchlibro.text();
        console.log(errorData);
        return;
    }

    const libro = await fetchlibro.json();
    cargarInfoLibro(libro);
}

function cargarInfoLibro(libro) {
    document.getElementById("libro-id").value = libro.id;
    document.getElementById("libro-genero").value = libro.generoLiterario.id;
    document.getElementById("libro-nombre").value = libro.nombre;
    document.getElementById("libro-sinopsis").value = libro.sinopsis;
    document.getElementById("libro-portada").value = libro.portada;
    document.getElementById("libro-precio").value = libro.precio;
    document.getElementById("libro-impuesto").value = libro.impuesto;
    document.getElementById("libro-stock").value = libro.stock;
    document.getElementById("libro-autor").value = libro.autor;
    document.getElementById("libro-editorial").value = libro.editorial;
    document.getElementById("libro-edicion").value = libro.edicion;
    document.getElementById("libro-fecha").value = libro.fecha_publicacion.slice(0, 10);
    document.getElementById("libro-num-paginas").value = libro.numero_paginas;
    document.getElementById("libro-coleccion").value = libro.coleccion;
    document.getElementById("libro-idioma").value = libro.idioma;
    idPortada = libro.id_portada; //Util mas adelante
}

function addselectGeneros(generosLiterarios) {
    select = document.getElementById("libro-genero");
    generosLiterarios.forEach(genero => {
        option = document.createElement('option');
        option.value = genero.id;
        option.textContent = genero.nombre;
        select.appendChild(option);
    });
}

async function guardarLibro(){
    const inputId = document.getElementById("libro-id").value;
    const inputGenero = document.getElementById("libro-genero").value;
    const inputNombre = document.getElementById("libro-nombre").value;
    const inputSinopsis = document.getElementById("libro-sinopsis").value;
    const inputPortada = document.getElementById("libro-portada").value;
    const inputPrecio = document.getElementById("libro-precio").value;
    const inputImpuesto = document.getElementById("libro-impuesto").value;
    const inputStock = document.getElementById("libro-stock").value;
    const inputAutor = document.getElementById("libro-autor").value;
    const inputEditorial = document.getElementById("libro-editorial").value;
    const inputEdicion = document.getElementById("libro-edicion").value;
    const inputFecha = document.getElementById("libro-fecha").value;
    const inputNumPaginas = document.getElementById("libro-num-paginas").value;
    const inputColeccion = document.getElementById("libro-coleccion").value;
    const inputIdioma = document.getElementById("libro-idioma").value;

    const campos = [
        inputNombre, inputSinopsis, inputPortada, inputPrecio,
        inputImpuesto, inputStock, inputAutor, inputFecha, inputNumPaginas, 
        inputColeccion
    ];

    const camposNumericos = [
        Number(inputPrecio), Number(inputImpuesto), Number(inputStock), Number(inputNumPaginas)
    ];

    const campoIncompleto = campos.some(campo => campo === null || campo === "");
    const camposNegativos = camposNumericos.some(campo => isNaN(campo) || campo <= 0)
    
    //Verificaciones
    if(campoIncompleto || camposNegativos || Number(inputImpuesto) > 1) {
        document.getElementById("error-general").style.display = "flex";
        return
    } else {
        document.getElementById("error-general").style.display = "none";
    }

    if (idLibro == 0) {
        const createLibro = await fetch(API_URL+"/libro/crearLibro", {
            method: "POST",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "generoLiterario": {
                    "id": Number(inputGenero)
                },
                "nombre": inputNombre,
                "sinopsis": inputSinopsis,
                "id_portada": idPortada,
                "portada": inputPortada,
                "precio": Number(inputPrecio),
                "impuesto": Number(inputImpuesto),
                "stock": Number(inputStock),
                "autor": inputAutor,
                "editorial": inputEditorial,
                "edicion": inputEdicion,
                "fecha_publicacion": inputFecha,
                "idioma": inputIdioma,
                "numero_paginas": Number(inputNumPaginas),
                "coleccion": inputColeccion
            }),
            credentials: "include"
        })
    
        if (!createLibro.ok) {
            const errorData = await createLibro.text();
            console.log(errorData);
            alert("¡Sucedio un error Inesperado!");
            return;
        }
        const newBook = await createLibro.json();
        alert("¡Libro Creado Exitosamente!")
        window.location.href = "/inventory.html";
        return;
    }

    const updateLibro = await fetch(API_URL+`/libro/${idLibro}`, {
        method: "PUT",
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "id": Number(idLibro),
            "generoLiterario": {
                "id": Number(inputGenero)
            },
            "nombre": inputNombre,
            "sinopsis": inputSinopsis,
            "id_portada": idPortada,
            "portada": inputPortada,
            "precio": Number(inputPrecio),
            "impuesto": Number(inputImpuesto),
            "stock": Number(inputStock),
            "autor": inputAutor,
            "editorial": inputEditorial,
            "edicion": inputEdicion,
            "fecha_publicacion": inputFecha,
            "idioma": inputIdioma,
            "numero_paginas": Number(inputNumPaginas),
            "coleccion": inputColeccion
        }),
        credentials: "include"
    })

    if (!updateLibro.ok) {
        const errorData = await updateLibro.text();
        console.log(errorData);
        alert("¡Sucedio un error Inesperado!");
        return;
    }

    alert("¡Libro Actualizado Exitosamente!")
    location.reload();
    return;
}

window.addEventListener('DOMContentLoaded', async () => {
    await verificarRol();

    //Cargar y mostrar los generos literarios
    await fetchGeneros();

    //Cargar la info del libro
    await fetchLibro();

    //Event Listener para guardar los cambios
    document.getElementById("btn-actualizar").addEventListener('click', async () => {
        await guardarLibro();
    })
});