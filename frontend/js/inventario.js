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

function addselectGeneros(generosLiterarios) {
    select = document.getElementById("select-genero-inventario");
    generosLiterarios.forEach(genero => {
        option = document.createElement('option');
        option.value = genero.nombre;
        option.textContent = genero.nombre;
        select.appendChild(option);
    });
}

/*async function fetchInventario() {
    const fetchInventario = await fetch(API_URL+"/libro/listarLibros", {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    if (!fetchInventario.ok) {
        const errorData = await fetchInventario.text();
        console.log(errorData);
        return;
    }

    inventario = await fetchInventario.json();
    cargarTablaInventario(inventario);
}*/

async function fetchInventarioFiltrado() {
    buscador = document.getElementById("buscador-inventario").value.trim();
    genero = document.getElementById("select-genero-inventario").value;
    endpoint = API_URL + `/libro/filtrar_libros?nombre=${buscador}&genero=${genero}`;
    
    if (buscador.length == 0 && genero.length == 0) {
        endpoint = API_URL + `/libro/filtrar_libros`;
    } else if(buscador.length == 0) {
        endpoint = API_URL + `/libro/filtrar_libros?genero=${genero}`;
    } else if(genero.length == 0) {
        endpoint = API_URL + `/libro/filtrar_libros?nombre=${buscador}`;
    }

    const fetchInventarioFiltrado = await fetch(endpoint, {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    if (!fetchInventarioFiltrado.ok) {
        const errorData = await fetchInventarioFiltrado.text();
        console.log(errorData);
        return;
    }

    inventario = await fetchInventarioFiltrado.json();
    cargarTablaInventario(inventario);
}

//Logica Paginador:
const FILAS_POR_PAGINA = 10;
let paginaActual = 1;
let inventarioData = [];

function cargarTablaInventario(inventario) {
    inventarioData = inventario;
    paginaActual = 1;
    renderPagina();
}

function renderPagina() {
    const tbody = document.getElementById("tabla-inventario-body");
    tbody.innerHTML = "";

    const inicio = (paginaActual - 1) * FILAS_POR_PAGINA;
    const fin = inicio + FILAS_POR_PAGINA;
    const datosPagina = inventarioData.slice(inicio, fin);

    if (datosPagina.length === 0) {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td colspan="7" class="text-center">No se encontraron productos</td>`;
        tbody.appendChild(fila);
        return;
    }

    datosPagina.forEach(libro => {
        const precio = Math.round(libro.precio * (1 + libro.impuesto));
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${libro.id}</td>
            <td>${libro.nombre}</td>
            <td>${libro.generoLiterario.nombre}</td>
            <td>COP $${precio.toLocaleString('es-CO')}</td>
            <td>${libro.stock}</td>
            <td><button class="btn btn-sm btn-primary">Editar</button></td>
        `;
        tbody.appendChild(fila);
    });

    renderPaginador();
}

function renderPaginador() {
    const totalPaginas = Math.ceil(inventarioData.length / FILAS_POR_PAGINA);
    const paginador = document.getElementById("paginador");
    paginador.innerHTML = "";

    // Botón "Previous"
    const liPrev = document.createElement("li");
    liPrev.className = `page-item ${paginaActual === 1 ? "disabled" : ""}`;
    liPrev.innerHTML = `<a class="page-link" href="#" tabindex="-1">«</a>`;
    liPrev.addEventListener("click", (e) => {
        e.preventDefault();
        if (paginaActual > 1) {
            paginaActual--;
            renderPagina();
        }
    });
    paginador.appendChild(liPrev);

    // Botones de número de página
    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === paginaActual ? "active" : ""}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener("click", (e) => {
            e.preventDefault();
            paginaActual = i;
            renderPagina();
        });
        paginador.appendChild(li);
    }

    // Botón "Next"
    const liNext = document.createElement("li");
    liNext.className = `page-item ${paginaActual === totalPaginas ? "disabled" : ""}`;
    liNext.innerHTML = `<a class="page-link" href="#">Next</a>`;
    liNext.addEventListener("click", (e) => {
        e.preventDefault();
        if (paginaActual < totalPaginas) {
            paginaActual++;
            renderPagina();
        }
    });
    paginador.appendChild(liNext);
}

var rol = null;
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

//Se hacen los respectivos fetch al cargarse el DOM
window.addEventListener('DOMContentLoaded', async () => {
    //Intervalo para la añadir los estilos del enlace activo:
    const waitForMenu = setInterval(() => {
        const menuInventario = document.getElementById("menu-inventario");
        if (menuInventario) {
            clearInterval(waitForMenu); 
            menuInventario.classList.add("menu-active");
        }
    }, 100);

    await verificarRol();

    //Cargar y mostrar los generos literarios
    await fetchGeneros();
    await fetchInventarioFiltrado();
});

//Event Listeners para menajar el filtrado
document.getElementById("select-genero-inventario").addEventListener("change", async () => {
    await fetchInventarioFiltrado();
});

document.getElementById("buscador-inventario").addEventListener("input", async () => {
    await fetchInventarioFiltrado();
});

document.getElementById("btn-filter-inventory").addEventListener("click", async () => {
    await fetchInventarioFiltrado();
});