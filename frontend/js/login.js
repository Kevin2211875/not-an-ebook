const tabLeft = document.getElementById('tabLeft');
const tabRight = document.getElementById('tabRight');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

tabLeft.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    tabLeft.classList.add('active');
    tabRight.classList.remove('active');
});

tabRight.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    tabRight.classList.add('active');
    tabLeft.classList.remove('active');
});

//Event Listener para poder ver la contraseña
document.getElementById("show-password-icon").addEventListener('click', () =>{
    if(document.getElementById("show-password-icon").classList.contains("bi-eye")){
        document.getElementById("show-password-icon").classList.remove("bi-eye");
        document.getElementById("show-password-icon").classList.add("bi-eye-slash")
        document.getElementById("login-password").type = "text";
    } else {
        document.getElementById("show-password-icon").classList.remove("bi-eye-slash")
        document.getElementById("show-password-icon").classList.add("bi-eye");
        document.getElementById("login-password").type = "password";
    }
})

//Event Listener para mostrar los errores basicos:
document.getElementById("login-password").addEventListener('input', () =>{
    const password = document.getElementById("login-password").value;
    const error = document.getElementById("password-error-login");

    if (password.length < 8 && password.length >= 1) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }
})

document.getElementById("login-correo").addEventListener('input', () =>{
    const email = document.getElementById("login-correo").value;
    const error = document.getElementById("email-error-login");

    //Expresion regular de GPT
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail && email.length > 0) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }
})

//Solicitud HTTP para iniciar sesión
async function iniciarSesion() {
    
    const email = document.getElementById("login-correo").value;
    const errorEmail = document.getElementById("email-error-login");
    let errorGeneral = document.getElementById("login-error-feedback");
    const password = document.getElementById("login-password");

    if (email.length == 0 || password.value.length < 8 || errorEmail.style.display == "flex") {
        errorGeneral.innerText = "Email o Contraseña invalidos"
        errorGeneral.style.display = "flex";
        return;
    } else {
        errorGeneral.style.display = "none";
    }

    document.getElementById("login-loading").style.display = "flex"

    const fetchIniciarSesion = await fetch(API_URL+"/auth/login", {
        method: "POST",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            "email": email,
            "password": password.value
        }),
        credentials: "include"
    })

    if (!fetchIniciarSesion.ok) {
        const errorData = await fetchIniciarSesion.json();
        if (errorData.message = "Access Denied") {
            errorGeneral.innerText = "Email o Contraseña Incorrectos"
            errorGeneral.style.display = "flex";
        }
        //console.log(errorData);
        document.getElementById("login-loading").style.display = "none"
        return;
    }
    //console.log(await fetchIniciarSesion.json())
    data = await fetchIniciarSesion.json()
    token = data.access_token;
    localStorage.setItem("token", token);
    document.getElementById("login-loading").style.display = "none"
    window.location.href = "/profile.html";
}

document.getElementById("iniciar-sesion").addEventListener('click', async () =>{
    await iniciarSesion();
})

/* --------------- FUNCIONES PARA MANEJAR EL REGISTRO --------------- */

//Event Listener para poder ver la contraseña
document.getElementById("reg-show-password-icon").addEventListener('click', () =>{
    icon = document.getElementById("reg-show-password-icon");
    if(icon.classList.contains("bi-eye")){
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash")
        document.getElementById("registro-password").type = "text";
    } else {
        icon.classList.remove("bi-eye-slash")
        icon.classList.add("bi-eye");
        document.getElementById("registro-password").type = "password";
    }
})

//Event Listener para poder ver el confirmar contraseña
document.getElementById("reg-rep-show-password-icon").addEventListener('click', () =>{
    icon = document.getElementById("reg-rep-show-password-icon");
    if(icon.classList.contains("bi-eye")){
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash")
        document.getElementById("registro-repeat-password").type = "text";
    } else {
        icon.classList.remove("bi-eye-slash")
        icon.classList.add("bi-eye");
        document.getElementById("registro-repeat-password").type = "password";
    }
})

//Event Listeners de verificaciones:
document.getElementById("registro-telefono").addEventListener('input', () =>{
    const telefono = document.getElementById("registro-telefono").value;
    const error = document.getElementById("registro-error-telefono");

    if (telefono.length != 10 && telefono.length > 0) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }
})

document.getElementById("registro-email").addEventListener('input', () =>{
    const email = document.getElementById("registro-email").value;
    const error = document.getElementById("registro-error-email");

    //Expresion regular de GPT
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail && email.length > 0) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }
})

document.getElementById("registro-password").addEventListener('input', () =>{
    const password = document.getElementById("registro-password").value;
    const error = document.getElementById("registro-error-password");

    if (password.length < 8 && password.length >= 1) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }

    if(password != document.getElementById("registro-repeat-password").value){
    } else {
        document.getElementById("registro-equal-password").style.display = "none";
    }
})

document.getElementById("registro-repeat-password").addEventListener('input', () =>{
    const password = document.getElementById("registro-repeat-password").value;
    const error = document.getElementById("registro-repeat-password-length");

    if (password.length < 8 && password.length >= 1) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }

    if(password != document.getElementById("registro-password").value){
        document.getElementById("registro-equal-password").style.display = "flex";
    } else {
        document.getElementById("registro-equal-password").style.display = "none";
    }
})

document.getElementById("registro-terminos").addEventListener('change', () =>{
    const checkbox = document.getElementById("registro-terminos").checked;
    const error = document.getElementById("registro-terminos-error");

    if (checkbox) {
        error.style.display = "none";
    } else {
        error.style.display = "flex";
    }
})

//Solicitud HTTP para Registrarse
async function registrarse() {
    
    const errorTelefono = document.getElementById("registro-error-telefono").style.display;
    const errorEmail = document.getElementById("registro-error-email").style.display;
    const errorContraseña = document.getElementById("registro-error-password").style.display;
    const errorContrseñasDiferentes = document.getElementById("registro-equal-password").style.display;
    const errorTerminos = document.getElementById("registro-terminos-error").style.display;
    let errorGeneral = document.getElementById("registro-error-general");

    const nombre = document.getElementById("registro-nombre").value;
    const apellido = document.getElementById("registro-apellido").value;
    const telefono = document.getElementById("registro-telefono").value;
    const correo = document.getElementById("registro-email").value;
    const password = document.getElementById("registro-repeat-password").value;

    //Verificaciones de Nulos y de errores
    if (nombre.length == 0 ||  apellido.length == 0 || telefono.length == 0 ||
        correo.length == 0 || password.length == 0) {
        errorGeneral.style.display = "flex";
        errorGeneral.innerText = "¡Tienes por lo menos un dato nulo!";
        return;
    } else if (errorTelefono == 'flex' || errorEmail == 'flex' || errorContraseña == 'flex' ||
        errorContrseñasDiferentes == 'flex' || errorTerminos == 'flex') {
        errorGeneral.style.display = "flex";
        errorGeneral.innerText = "¡Tienes por lo menos un dato invalido!";
        return;
    } else {
        errorGeneral.style.display = "none";
    }

    document.getElementById("registro-loading").style.display = "flex"

    const fetchRegistrarse = await fetch(API_URL+"/auth/register", {
        method: "POST",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            "name": nombre,
            "apellidos": apellido,
            "correo": correo,
            "contrasena": password,
            "telefono": telefono
        }),
        credentials: "include"
    })

    if (!fetchRegistrarse.ok) {
        const errorData = await fetchRegistrarse.json();
        if (errorData.message.includes("could not execute statement [ERROR: duplicate key")) {
            errorGeneral.style.display = "flex";
            errorGeneral.innerText = "¡Ya existe un usuario con ese correo!";
        }
        //console.log(errorData);
        document.getElementById("registro-loading").style.display = "none"
        return;
    }
    //console.log(await fetchRegistrarse.json())
    data = await fetchRegistrarse.json()
    token = data.access_token;
    localStorage.setItem("token", token);
    document.getElementById("registro-loading").style.display = "none"
    window.location.href = "/profile.html";
}

document.getElementById("btn-registrarse").addEventListener('click', async () =>{
    await registrarse();
})