window.addEventListener('DOMContentLoaded', () => {
    //Cargamos el menú a partir de su respectivo <template>
    fetch('components/menuAdmin.html')
        .then(response => response.text())
        .then(data => {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            const template = temp.querySelector('#menu-admin-template');
            const clone = document.importNode(template.content, true);

            //Añadimos los event listeners para que redireccioné correctamente

            clone.querySelector("#menu-inventario").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/inventory.html";
                }
            });

            clone.querySelector("#menu-reporte").addEventListener("click", () => {
                if (token == null) {
                    window.location.href = "/login.html";
                } else {
                    window.location.href = "/reporte.html";
                }
            });

            clone.querySelector("#menu-cerrar-sesion").addEventListener("click", () => {
                    localStorage.removeItem("token");
                    window.location.href='/index.html'
            });
            document.getElementById('menu-admin-container').appendChild(clone);
        }
    );
});