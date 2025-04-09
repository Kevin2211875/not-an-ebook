var API_URL= 'http://localhost:8081'

var token = localStorage.getItem("token");
var rol = null;

//Función para extraer el correo del token.
function parseJwt(token) {
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1]; // Parte del payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Token inválido:", error);
        return null;
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    //Cargamos el header a partir de su respectivo <template>
    try {
        const response = await fetch('components/header.html');
        const data = await response.text();

        const temp = document.createElement('div');
        temp.innerHTML = data;

        const template = temp.querySelector('#header-template');
        const clone = document.importNode(template.content, true);

        // Añadir eventos
        clone.querySelector("#left-column-2r").addEventListener("click", () => {
            window.location.href = "/";
        });

        clone.querySelector("#btn-profile").addEventListener("click", () => {
            window.location.href = token == null ? "/login.html" : "/profile.html";
        });

        clone.querySelector("#btn-shopping-cart").addEventListener("click", () => {
            window.location.href = token == null ? "/login.html" : "/shoppingCart.html";
        });

        clone.querySelector("#btn-order-history").addEventListener("click", () => {
            window.location.href = token == null ? "/login.html" : "/orderHistory.html";
        });

        clone.querySelector("#btn-inventory").addEventListener("click", () => {
            window.location.href = token == null ? "/login.html" : "/inventory.html";
        });

        // Verifica el rol antes de insertar el header
        await verificarRol();

        if (rol == 2 || rol == null) {
            const invNavContainer = clone.getElementById("inv-nav-container");
            if (invNavContainer) {
                invNavContainer.remove();
            }
        }

        // Agrega el header al DOM
        document.getElementById('header').appendChild(clone);

        //Agregamos el event listener desde el DOM
        document.querySelector("#btn-buscar-libro").addEventListener("click", () => {
            const barra = document.getElementById("barra-busqueda");
            const textoBusqueda = barra ? barra.value.trim() : "";
            sessionStorage.setItem("terminoBusqueda", textoBusqueda);
            window.location.href = "/searchBooks.html";
        });

        document.dispatchEvent(new Event("headerLoaded"));

    } catch (error) {
        console.error("Error al cargar el header:", error);
    }

    //Cargamos el footer a partir de su respectivo <template>
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            const template = temp.querySelector('#footer-template');
            const clone = document.importNode(template.content, true);

            clone.querySelector("#a-profile").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/profile.html";
                }
            });

            clone.querySelector("#a-cart").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/shoppingCart.html";
                }
            });

            clone.querySelector("#a-history").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/orderHistory.html";
                }
            });

            clone.querySelector("#a-search").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/searchBooks.html";
                }
            });
            document.getElementById('footer').appendChild(clone);
        }
    );
});

async function verificarRol() {
    //Volvemos a cargar el token
    token = localStorage.getItem("token");
    const tokenData = parseJwt(token);
    if (token == null || tokenData == null) {
        //Se fuerza el logout
        localStorage.removeItem("token"); //Se elimina porque no es valido
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
        return;
    }

    const usuario = await fetchUsuario.json();
    rol = usuario.tipoUsuario.id;
}