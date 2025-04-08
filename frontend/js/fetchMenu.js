window.addEventListener('DOMContentLoaded', () => {
    //Cargamos el menú a partir de su respectivo <template>
    fetch('components/menu.html')
        .then(response => response.text())
        .then(data => {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            const template = temp.querySelector('#menu-template');
            const clone = document.importNode(template.content, true);

            //Añadimos los event listeners para que redireccioné correctamente

            clone.querySelector("#menu-perfil").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/profile.html";
                }
            });

            clone.querySelector("#menu-carrito").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/shoppingCart.html";
                }
            });

            clone.querySelector("#menu-historial").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/orderHistory.html";
                }
            });

            clone.querySelector("#menu-cerrar-sesion").addEventListener("click", () => {
                    localStorage.removeItem("token");
                    window.location.href='/index.html'
            });
            document.getElementById('menu-container').appendChild(clone);
        }
    );
});