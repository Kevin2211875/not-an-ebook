var API_URL= 'http://localhost:8081'

var token = localStorage.getItem("token");

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

window.addEventListener('DOMContentLoaded', () => {
    //Cargamos el header a partir de su respectivo <template>
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            const template = temp.querySelector('#header-template');
            const clone = document.importNode(template.content, true);

            //Añadimos los event listeners para que redireccioné correctamente
            clone.querySelector("#left-column-2r").addEventListener("click", () => {
                window.location.href = "/";
            });

            clone.querySelector("#btn-profile").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/profile.html";
                }
            });

            clone.querySelector("#btn-shopping-cart").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/shoppingCart.html";
                }
            });

            clone.querySelector("#btn-order-history").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/orderHistory.html";
                }
            });

            clone.querySelector("#btn-inventory").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/inventory.html";
                }
            });
            document.getElementById('header').appendChild(clone);
        }
    );

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