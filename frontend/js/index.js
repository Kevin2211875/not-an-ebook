async function fetchGeneros() {
    const fetchGeneros = await fetch(API_URL+"/libro/generos-ordenados", {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    if (!fetchGeneros.ok) {
        const errorData = await fetchGeneros.json();
        console.log(errorData);
        return;
    }

    generosLiterarios = await fetchGeneros.json();
    cargarGeneros(generosLiterarios);
    //console.log(generosLiterarios)
}

function cargarGeneros(generosLiterarios) {
    let mainCarruselItem = document.getElementById("main-carrusel-item");
    const contenedorGeneros = document.createElement("div");
    contenedorGeneros.classList.add("generosContainer");
    for (let i = 0; i < 6; i++) {
        const genero = document.createElement("div");
        genero.classList.add("card-generos");
        genero.innerHTML =`
         <button class="card" value="${generosLiterarios[i].nombre}">
            <img src="${generosLiterarios[i].portada}" class="card-img-top" alt="genero literario" width="135" height="190">
            <div class="card-body" style="margin-top:2px;">
                <p class="card-text">${generosLiterarios[i].nombre}</p>
            </div>
        </button>
        `;
        contenedorGeneros.appendChild(genero);
    }
    mainCarruselItem.appendChild(contenedorGeneros)

    //Cargamos la segunda fila de generos literarios
    let carruselItem = document.getElementById("second-carrusel-item");
    const secondContenedorGeneros = document.createElement("div");
    secondContenedorGeneros.classList.add("generosContainer");
    for (let j = 6; j < 12; j++) {
        const genero = document.createElement("div");
        genero.classList.add("card-generos");
        genero.innerHTML =`
         <button class="card">
            <img src="${generosLiterarios[j].portada}" class="card-img-top" alt="genero literario" width="135" height="190">
            <div class="card-body">
                <p class="card-text">${generosLiterarios[j].nombre}</p>
            </div>
        </button>
        `;
        secondContenedorGeneros.appendChild(genero);
    }
    carruselItem.appendChild(secondContenedorGeneros)
}

async function fetchLibrosRecientes(){
    const fetchLibros = await fetch(API_URL+"/libro/listarLibros", {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        credentials: "include"
    })

    if (!fetchLibros.ok) {
        const errorData = await fetchLibros.json();
        console.log(errorData);
        return;
    }

    libros = await fetchLibros.json();
    cargarLibrosRecientes(libros.slice(-12));
    //console.log(libros.slice(-12))
}

function cargarLibrosRecientes(listaLibros) {
    fetch('components/book-card.html?v=' + Date.now())
        .then(response => response.text())
        .then(data => {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            const template = temp.querySelector('#book-template');
            for (let i = 0; i < 12; i++) {
                impuesto = listaLibros[i].impuesto
                precio = Math.round(listaLibros[i].precio * (1 + impuesto));
                let cantidad = 0;

                if (listaLibros[i].stock > 0) {
                   disponibilidad = "Disponible"; 
                } else {
                   disponibilidad = "Agotado"; 
                }

                fecha = listaLibros[i].fecha_publicacion.slice(0, 10)

                const clone = document.importNode(template.content, true);
                clone.querySelector("[libro-titulo]").textContent = listaLibros[i].nombre;
                clone.querySelector("[libro-precio]").textContent = `COP $${precio.toLocaleString('es-CO')}`;
                clone.querySelector("[libro-cantidad]").textContent = `Cantidad: ${cantidad}`;
                clone.querySelector("[libro-portada]").src = listaLibros[i].portada;

                //Añadimos los event Listeners para manejar la cantidad:
                const btnMas = clone.querySelector("#plus-quantity-card");
                const btnMenos = clone.querySelector("#minus-quantity-card");
                const cantidadEl = clone.querySelector("[libro-cantidad]");

                cantidadEl.textContent = `Cantidad: ${cantidad}`;

                btnMas.addEventListener("click", () => {
                    cantidad++;
                    cantidadEl.textContent = `Cantidad: ${cantidad}`;
                    cantidadmodal.textContent = `x${cantidad}`;
                });

                btnMenos.addEventListener("click", () => {
                    if (cantidad > 0){
                        cantidad--
                        cantidadEl.textContent = `Cantidad: ${cantidad}`;
                        cantidadmodal.textContent = `x${cantidad}`;
                    };        
                });

                //EventListener direccionamiento carrito
                clone.getElementById("book-card-red-cart").addEventListener("click", () => {
                    window.location.href = "/shoppingCart.html"
                });

                //Actualizamos los IDs para tener un modal por tarjeta

                const modalId = `detailsModal-${listaLibros[i].id}`;
                clone.querySelectorAll('[data-bs-target], .modal').forEach(el => {
                    if (el.dataset.bsTarget === '#__ID_MODAL__') {
                        el.dataset.bsTarget = `#${modalId}`;
                    }
                    if (el.id === '__ID_MODAL__') {
                        el.id = modalId;
                    }
                });

                //Mapeamos los valores a su respectivo modal
                const modal = clone.querySelector('.modal'); // Ya es el modal clonado dentro del fragmento
                modal.querySelector('[libro-portada]').src = listaLibros[i].portada;
                modal.querySelector('[libro-titulo]').textContent = listaLibros[i].nombre;
                modal.querySelector('[libro-precio]').textContent = `COP $${precio.toLocaleString('es-CO')}`;
                modal.querySelector('[libro-cantidad-modal]').textContent = `x${cantidad}`;
                modal.querySelector('[libro-fecha]').textContent = fecha;
                modal.querySelector('[libro-disponibilidad]').textContent = disponibilidad;
                modal.querySelector('[libro-autor]').textContent = listaLibros[i].autor;
                modal.querySelector('[libro-genero]').textContent = listaLibros[i].generoLiterario.nombre;
                modal.querySelector('[libro-editorial]').textContent = listaLibros[i].editorial;
                modal.querySelector('[libro-edicion]').textContent = listaLibros[i].edicion;
                
                const sinopsisConSaltos = listaLibros[i].sinopsis.replace(/\\n\\n/g, '<br>');
                modal.querySelector('[libro-sinopsis]').innerHTML = sinopsisConSaltos;
                           
                //Añadimos los event Listeners para manejar la cantidad:
                const btnMasModal = clone.querySelector("#plus-quantity-modal");
                const btnMenosModal = clone.querySelector("#minus-quantity-modal");
                const cantidadmodal = clone.querySelector("[libro-cantidad-modal]");

                cantidadEl.textContent = `Cantidad: ${cantidad}`;

                btnMasModal.addEventListener("click", () => {
                    cantidad++;
                    cantidadEl.textContent = `Cantidad: ${cantidad}`;
                    cantidadmodal.textContent = `x${cantidad}`;
                });

                btnMenosModal.addEventListener("click", () => {
                    if (cantidad > 0){
                        cantidad--;
                        cantidadEl.textContent = `Cantidad: ${cantidad}`;
                        cantidadmodal.textContent = `x${cantidad}`;
                    };        
                });

                //EventListener direccionamiento carrito
                clone.getElementById("book-modal-red-cart").addEventListener("click", () => {
                    window.location.href = "/shoppingCart.html"
                });

                //Para decidir a que fila se agrega:
                if (i < 6) {
                    document.getElementById('latest-books-1').appendChild(clone);
                }else {
                    document.getElementById('latest-books-2').appendChild(clone);
                }
            }
        }
    );
}

//Cargamos los libros mas recientes:
window.addEventListener('DOMContentLoaded', async () => {
    //Cargamos los generos literarios
    fetchGeneros();

    //Cargamos los libros
    fetchLibrosRecientes();
});