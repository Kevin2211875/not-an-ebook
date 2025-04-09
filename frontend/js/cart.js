window.addEventListener('DOMContentLoaded', async () => {
    //Intervalo para la añadir los estilos del enlace activo:
    const waitForMenu = setInterval(() => {
        const menuPerfil = document.getElementById("menu-carrito");
        if (menuPerfil) {
            clearInterval(waitForMenu); 
            menuPerfil.classList.add("menu-active");
        }
    }, 100);

    //Volvemos a cargar el token
    token = localStorage.getItem("token"); 
    const tokenData = parseJwt(token);
    if (token == null || tokenData == null) {
        //Se fuerza el logout
        localStorage.removeItem("token"); //Se elimina porque no es valido
        window.location.href='/index.html' 
    }
});