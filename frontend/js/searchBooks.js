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

function cargarLibrosFiltrados(listaLibros) {
    const librosPorPagina = 6;
    let paginaActual = 1;

    function renderPagina(pagina) {
        fetch('components/book-card.html?v=' + Date.now())
            .then(response => response.text())
            .then(data => {
                const contenedor = document.getElementById("div-busqueda-libros");
                contenedor.innerHTML = "";
                const temp = document.createElement('div');
                temp.innerHTML = data;
                const template = temp.querySelector('#book-template');

                const inicio = (pagina - 1) * librosPorPagina;
                const fin = inicio + librosPorPagina;
                const librosPagina = listaLibros.slice(inicio, fin);

                let row;
                librosPagina.forEach((libro, indice) => {
                    let cantidad = 0;
                    let disponibilidad = libro.stock > 0 ? "Disponible" : "Agotado";
                    let precio = Math.round(libro.precio * (1 + libro.impuesto));
                    let fecha = libro.fecha_publicacion.slice(0, 10);

                    const clone = document.importNode(template.content, true);
                    clone.querySelector("[libro-titulo]").textContent = libro.nombre;
                    clone.querySelector("[libro-precio]").textContent = `COP $${precio.toLocaleString('es-CO')}`;
                    clone.querySelector("[libro-cantidad]").textContent = `Cantidad: ${cantidad}`;
                    clone.querySelector("[libro-portada]").src = libro.portada;

                    const btnMas = clone.querySelector("#plus-quantity-card");
                    const btnMenos = clone.querySelector("#minus-quantity-card");
                    const cantidadEl = clone.querySelector("[libro-cantidad]");

                    btnMas.addEventListener("click", () => {
                        cantidad++;
                        cantidadEl.textContent = `Cantidad: ${cantidad}`;
                        cantidadmodal.textContent = `x${cantidad}`;
                    });

                    btnMenos.addEventListener("click", () => {
                        if (cantidad > 0) {
                            cantidad--;
                            cantidadEl.textContent = `Cantidad: ${cantidad}`;
                            cantidadmodal.textContent = `x${cantidad}`;
                        };
                    });

                    clone.getElementById("book-card-red-cart").addEventListener("click", () => {
                        window.location.href = "/shoppingCart.html";
                    });

                    const modalId = `detailsModal-${libro.id}`;
                    clone.querySelectorAll('[data-bs-target], .modal').forEach(el => {
                        if (el.dataset.bsTarget === '#__ID_MODAL__') el.dataset.bsTarget = `#${modalId}`;
                        if (el.id === '__ID_MODAL__') el.id = modalId;
                    });

                    const modal = clone.querySelector('.modal');
                    modal.querySelector('[libro-portada]').src = libro.portada;
                    modal.querySelector('[libro-titulo]').textContent = libro.nombre;
                    modal.querySelector('[libro-precio]').textContent = `COP $${precio.toLocaleString('es-CO')}`;
                    modal.querySelector('[libro-cantidad-modal]').textContent = `x${cantidad}`;
                    modal.querySelector('[libro-fecha]').textContent = fecha;
                    modal.querySelector('[libro-disponibilidad]').textContent = disponibilidad;
                    modal.querySelector('[libro-autor]').textContent = libro.autor;
                    modal.querySelector('[libro-genero]').textContent = libro.generoLiterario.nombre;
                    modal.querySelector('[libro-editorial]').textContent = libro.editorial;
                    modal.querySelector('[libro-edicion]').textContent = libro.edicion;

                    const sinopsisConSaltos = libro.sinopsis.replace(/\\n\\n/g, '<br>');
                    modal.querySelector('[libro-sinopsis]').innerHTML = sinopsisConSaltos;

                    const btnMasModal = clone.querySelector("#plus-quantity-modal");
                    const btnMenosModal = clone.querySelector("#minus-quantity-modal");
                    const cantidadmodal = clone.querySelector("[libro-cantidad-modal]");

                    btnMasModal.addEventListener("click", () => {
                        cantidad++;
                        cantidadEl.textContent = `Cantidad: ${cantidad}`;
                        cantidadmodal.textContent = `x${cantidad}`;
                    });

                    btnMenosModal.addEventListener("click", () => {
                        if (cantidad > 0) {
                            cantidad--;
                            cantidadEl.textContent = `Cantidad: ${cantidad}`;
                            cantidadmodal.textContent = `x${cantidad}`;
                        };
                    });

                    clone.getElementById("book-modal-red-cart").addEventListener("click", () => {
                        window.location.href = "/shoppingCart.html";
                    });

                    if (indice % 3 === 0) {
                        row = document.createElement('div');
                        row.classList.add('row', 'card-row');
                        contenedor.appendChild(row);
                    }
                    row.appendChild(clone);
                });

                renderPaginador(pagina);
            });
    }

    function renderPaginador(paginaSeleccionada) {
        const paginador = document.getElementById("paginador");
        paginador.innerHTML = "";
    
        const totalPaginas = Math.ceil(listaLibros.length / librosPorPagina);
    
        // Botón "Anterior"
        const liPrev = document.createElement("li");
        liPrev.classList.add("page-item");
        if (paginaSeleccionada === 1) liPrev.classList.add("disabled");
    
        const aPrev = document.createElement("a");
        aPrev.classList.add("page-link");
        aPrev.href = "#";
        aPrev.textContent = "«";
        aPrev.addEventListener("click", (e) => {
            e.preventDefault();
            if (paginaSeleccionada > 1) {
                paginaActual--;
                renderPagina(paginaActual);
            }
        });
    
        liPrev.appendChild(aPrev);
        paginador.appendChild(liPrev);
    
        // Números de página
        for (let i = 1; i <= totalPaginas; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === paginaSeleccionada) li.classList.add("active");
    
            const a = document.createElement("a");
            a.classList.add("page-link");
            a.textContent = i;
            a.href = "#";
    
            a.addEventListener("click", (e) => {
                e.preventDefault();
                paginaActual = i;
                renderPagina(paginaActual);
            });
    
            li.appendChild(a);
            paginador.appendChild(li);
        }
    
        // Botón "Siguiente"
        const liNext = document.createElement("li");
        liNext.classList.add("page-item");
        if (paginaSeleccionada === totalPaginas) liNext.classList.add("disabled");
    
        const aNext = document.createElement("a");
        aNext.classList.add("page-link");
        aNext.href = "#";
        aNext.textContent = "»";
        aNext.addEventListener("click", (e) => {
            e.preventDefault();
            if (paginaSeleccionada < totalPaginas) {
                paginaActual++;
                renderPagina(paginaActual);
            }
        });
    
        liNext.appendChild(aNext);
        paginador.appendChild(liNext);
    }

    renderPagina(paginaActual);
}


async function fetchLibrosBuscados() {
    buscador = document.getElementById("barra-busqueda").value.trim();
    genero = document.getElementById("select-genero-inventario").value;
    endpoint = API_URL + `/libro/filtrar_libros?nombre=${buscador}&genero=${genero}`;
    
    if (buscador.length == 0 && genero.length == 0) {
        endpoint = API_URL + `/libro/filtrar_libros`;
    } else if(buscador.length == 0) {
        endpoint = API_URL + `/libro/filtrar_libros?genero=${genero}`;
    } else if(genero.length == 0) {
        endpoint = API_URL + `/libro/filtrar_libros?nombre=${buscador}`;
    }

    const fetchLibrosBuscados = await fetch(endpoint, {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    if (!fetchLibrosBuscados.ok) {
        const errorData = await fetchInventarioFiltrado.text();
        console.log(errorData);
        return;
    }

    let libros = await fetchLibrosBuscados.json();
    if (document.getElementById("select-orden").value == 2 ) {
        libros = libros.reverse();
    }
    //console.log(libros)
    cargarLibrosFiltrados(libros);
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchGeneros();

    //Cuando cargue la barra de busqueda en el DOM
    document.addEventListener("headerLoaded", async () => {
        const termino = sessionStorage.getItem("terminoBusqueda");
        if (termino) {
            const input = document.getElementById("barra-busqueda");
            if (input) {
                input.value = termino;
                await fetchLibrosBuscados();
                sessionStorage.removeItem("terminoBusqueda");
            } else {
                console.warn("Input todavía no existe aunque header se cargó.");
            }
        }

        document.getElementById("barra-busqueda").addEventListener("input", async () => {
            await fetchLibrosBuscados();
        });
    
        const select = document.getElementById("select-genero-inventario");
        if (select) {
            select.addEventListener("change", async () => {
                await fetchLibrosBuscados();
            });
        }

        document.getElementById("select-orden").addEventListener("change", async () => {
            await fetchLibrosBuscados();
        });

        await fetchLibrosBuscados();
    });

    document.getElementById("select-genero-inventario").addEventListener("change", async () => {
        await fetchLibrosBuscados();
    });
});