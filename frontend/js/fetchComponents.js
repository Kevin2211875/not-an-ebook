var API_URL= 'http://localhost:8081'

var token = localStorage.getItem("token");

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
            document.getElementById('footer').appendChild(clone);
        }
    );
});