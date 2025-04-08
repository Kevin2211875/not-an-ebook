var correoUsuario = '';
var idUsuario = 0;
var idDireccion = 0;

window.addEventListener('DOMContentLoaded', async () => {
    //Intervalo para la añadir los estilos del enlace activo:
    const waitForMenu = setInterval(() => {
        const menuPerfil = document.getElementById("menu-perfil");
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

    correoUsuario = tokenData.sub;
    await fetchUsuario();
    await fetchDireccion();
});

async function fetchUsuario() {
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
    idUsuario = usuario.id;
    cargarDatosUsuario(usuario);
    cargarDatosModalUsuario(usuario)
}

function cargarDatosUsuario(usuario) {
    const nombre = document.getElementById("card-nombre");
    const correo = document.getElementById("card-correo");
    const telefono = document.getElementById("card-telefono");

    const nombreCompleto = usuario.nombres + " " + usuario.apellidos

    nombre.innerHTML = `<b style="font-weight: 500;">Nombre: </b>${nombreCompleto || "N.A"}`;
    correo.innerHTML = `<b style="font-weight: 500;">Correo: </b>${usuario.email || "N.A"}`;
    telefono.innerHTML = `<b style="font-weight: 500;">Teléfono: </b>${usuario.telefono || "N.A"}`;
}

function cargarDatosModalUsuario(usuario) {
    const nombre = document.getElementById("modal-nombre");
    const apellido = document.getElementById("modal-apellido");
    const correo = document.getElementById("modal-email");
    const telefono = document.getElementById("modal-telefono");

    nombre.value = usuario.nombres;
    apellido.value = usuario.apellidos;
    correo.value = usuario.email;
    telefono.value = usuario.telefono;
}

/*------- ACTUALIZAR USUARIO --------*/ 

//Event Listener para poder ver la contraseña
document.getElementById("card-show-password-icon").addEventListener('click', () =>{
    icon = document.getElementById("card-show-password-icon");
    if(icon.classList.contains("bi-eye")){
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash")
        document.getElementById("card-password").type = "text";
    } else {
        icon.classList.remove("bi-eye-slash")
        icon.classList.add("bi-eye");
        document.getElementById("card-password").type = "password";
    }
})

//Event Listener para poder ver el confirmar contraseña
document.getElementById("card-rep-show-password-icon").addEventListener('click', () =>{
    icon = document.getElementById("card-rep-show-password-icon");
    if(icon.classList.contains("bi-eye")){
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash")
        document.getElementById("card-repeat-password").type = "text";
    } else {
        icon.classList.remove("bi-eye-slash")
        icon.classList.add("bi-eye");
        document.getElementById("card-repeat-password").type = "password";
    }
})

//Event listeners de manejo de errores
document.getElementById("modal-telefono").addEventListener('input', () =>{
    const telefono = document.getElementById("modal-telefono").value;
    const error = document.getElementById("update-error-telefono");

    if (telefono.length != 10 && telefono.length > 0) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }
})

document.getElementById("modal-email").addEventListener('input', () =>{
    const email = document.getElementById("modal-email").value;
    const error = document.getElementById("update-error-email");

    //Expresion regular de GPT
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail && email.length > 0) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }
})

document.getElementById("card-password").addEventListener('input', () =>{
    const password = document.getElementById("card-password").value;
    const error = document.getElementById("error-password");

    if (password.length < 8 && password.length >= 1) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }

    if(password == document.getElementById("card-repeat-password").value){
        document.getElementById("repeat-equal-password").style.display = "none";
    }
})

document.getElementById("card-repeat-password").addEventListener('input', () =>{
    const password = document.getElementById("card-repeat-password").value;
    const error = document.getElementById("repeat-password-length");

    if (password.length < 8 && password.length >= 1) {
        error.style.display = "flex";
    } else {
        error.style.display = "none";
    }

    if(password != document.getElementById("card-password").value){
        document.getElementById("repeat-equal-password").style.display = "flex";
    } else {
        document.getElementById("repeat-equal-password").style.display = "none";
    }
})

async function actualizarUsuario(){
    const newName = document.getElementById("modal-nombre").value;
    const newLastName = document.getElementById("modal-apellido").value;
    const newEmail = document.getElementById("modal-email").value;
    const newPhone = document.getElementById("modal-telefono").value;

    const errorEmail = document.getElementById("update-error-email");
    const errorTelefono = document.getElementById("update-error-telefono");

    if (newName.length == 0 || newLastName.length == 0 || newEmail.length == 0 || newPhone.length == 0) {
        document.getElementById("update-error-general").innerText = "* Hay por lo menos un campo vacio *";
        document.getElementById("update-error-general").style.display = "flex";
        return;
    } else if (errorEmail.style.display == "flex" || errorTelefono.style.display == "flex") {
        document.getElementById("update-error-general").innerText = "* El telefono o el Correo electrónico es invalido *";
        document.getElementById("update-error-general").style.display = "flex";
        return;
    } else {
        document.getElementById("update-error-general").style.display = "none";
    }

    const fetchUpdate = await fetch(API_URL+"/auth/update", {
        method: "PUT",
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": newName.trim(),
            "apellidos": newLastName.trim(),
            "correo": newEmail.trim(),
            "telefono": newPhone.trim()
        }),
        credentials: "include"
    })

    if (!fetchUpdate.ok) {
        const errorData = await fetchUpdate.json();
        console.log(errorData);
        return;
    }
    
    const respuesta = await fetchUpdate.json();
    token = respuesta.access_token;
    localStorage.setItem("token", token); //actualizamos el token por si acaso
    
    await fetchUsuario(); //Recargamos los Datos ya actualizados

    alert("Actualización exitosa!");

    //Cerramos el modal
    const modalElement = document.getElementById('modal-datos-personales');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}

document.getElementById("btn-update-perfil").addEventListener("click", async () => {
    await actualizarUsuario();
})

async function actualizarContraseña(){
    const nameValue = document.getElementById("modal-nombre").value;
    const lastName = document.getElementById("modal-apellido").value;
    const email = document.getElementById("modal-email").value;
    const phone = document.getElementById("modal-telefono").value;
    const newPassword = document.getElementById("card-repeat-password").value;

    const notEqualPassword = document.getElementById("repeat-equal-password");
    const lengthPassword = document.getElementById("repeat-password-length");

    if (newPassword.length == 0) {
        lengthPassword.style.display = "flex";
        return;
    } else if (notEqualPassword.style.display == "flex" || lengthPassword.style.display == "flex") {
        return;
    }

    const fetchUpdatePassword = await fetch(API_URL+"/auth/update", {
        method: "PUT",
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": nameValue,
            "apellidos": lastName,
            "correo": email,
            "telefono": phone,
            "contrasena": newPassword
        }),
        credentials: "include"
    })

    if (!fetchUpdatePassword.ok) {
        const errorData = await fetchUpdatePassword.json();
        console.log(errorData);
        return;
    }
    
    const respuesta = await fetchUpdatePassword.json();
    token = respuesta.access_token;
    localStorage.setItem("token", token); //actualizamos el token por si acaso

    alert("¡Contraseña actualizada exitosamente!\n\nPor favor inicia sesión nuevamente");

    //cerramos Sesión
    localStorage.removeItem("token");
    window.location.href='/index.html';
}

document.getElementById("btn-update-constrasena").addEventListener("click", async () => {
    await actualizarContraseña();
})

/*------- GESTION DIRECCION DEL USUARIO --------*/ 
async function fetchDireccion() {
    if (idUsuario == 0) {
        return;
    }
    const fetchDireccion = await fetch(API_URL + `/direccion/usuario/${idUsuario}`, {
        method: "GET",
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    })

    if (!fetchDireccion.ok) {
        const errorData = await fetchDireccion.text();
        console.log(errorData);
        return;
    }

    const direccion = await fetchDireccion.json();
    idDireccion = direccion[0].id; //Actualizamos el id de la dirección
    cargarDireccionUsuario(direccion[0]);
    cargarDireccionModalUsuario(direccion[0])
}

function cargarDireccionUsuario(direccion) {
    const pais = document.getElementById("card-pais");
    const region = document.getElementById("card-region");
    const ciudad = document.getElementById("card-ciudad");
    const codigoPostal = document.getElementById("card-codigo-postal");
    const direccionVar = document.getElementById("card-direccion");

    pais.innerHTML = `<b style="font-weight: 500;">Pais: </b>${direccion.pais || "N.A"}`;
    region.innerHTML = `<b style="font-weight: 500;">Region/Estado: </b>${direccion.region || "N.A"}`;
    ciudad.innerHTML = `<b style="font-weight: 500;">Ciudad: </b>${direccion.ciudad || "N.A"}`;
    codigoPostal.innerHTML = `<b style="font-weight: 500;">Codigo Postal: </b>${direccion.codigo_postal || "N.A"}`;
    direccionVar.innerHTML = `<b style="font-weight: 500;">Dirección: </b>${direccion.direccion || "N.A"}`;
}

function cargarDireccionModalUsuario(direccion) {
    const pais = document.getElementById("modal-pais");
    const region = document.getElementById("modal-region");
    const ciudad = document.getElementById("modal-ciudad");
    const codigoPostal = document.getElementById("modal-codigo-postal");
    const direccionVar = document.getElementById("modal-valor-direccion");

    pais.value = direccion.pais;
    region.value = direccion.region;
    ciudad.value = direccion.ciudad;
    codigoPostal.value = direccion.codigo_postal;
    direccionVar.value = direccion.direccion;
}

async function actualizarDireccion() {
    const pais = document.getElementById("modal-pais").value;
    const region = document.getElementById("modal-region").value;
    const ciudad = document.getElementById("modal-ciudad").value;
    const codigoPostal = document.getElementById("modal-codigo-postal").value;
    const direccion = document.getElementById("modal-valor-direccion").value;

    const errorMsg = document.getElementById("direccion-error-general");

    if (!pais || !region || !ciudad || !codigoPostal || !direccion) {
        errorMsg.style.display = "flex";
        return;
    }
    
    errorMsg.style.display = "none"; //Se esconde el error

    if (idDireccion == 0) {
        const nuevaDireccion = await fetch(API_URL + `/direccion/ingresarDireccion`, {
            method: "POST",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "direccion": direccion.trim(),
                "pais": pais.trim(),
                "region": region.trim(),
                "ciudad": ciudad.trim(),
                "codigo_postal": codigoPostal.trim(),
                "usuario": {
                    "id": idUsuario
                }
            }),
            credentials: "include"
        })
    
        if (!nuevaDireccion.ok) {
            const errorData = await nuevaDireccion.text();
            console.log(errorData);
            return;
        }
    } else {
        const direccionActualizada = await fetch(API_URL + `/direccion/${idDireccion}`, {
            method: "PUT",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": idDireccion,
                "direccion": direccion.trim(),
                "pais": pais.trim(),
                "region": region.trim(),
                "ciudad": ciudad.trim(),
                "codigo_postal": codigoPostal.trim(),
                "usuario": {
                    "id": idUsuario
                }
            }),
            credentials: "include"
        })
    
        if (!direccionActualizada.ok) {
            const errorData = await direccionActualizada.text();
            console.log(errorData);
            return;
        }
    }
    alert("La dirección se actualizo correctamente!")

    //cerramos el modal
    const modalElement = document.getElementById('modal-direccion');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    await fetchDireccion(); //recargamos la direccion
}

document.getElementById("btn-update-direccion").addEventListener("click", async () => {
    await actualizarDireccion();
})

async function eliminarDireccion() {
    if (idDireccion != 0) {
        const borrarDireccion = await fetch(API_URL + `/direccion/${idDireccion}`, {
            method: "DELETE",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
            },
            credentials: "include"
        })
    
        if (!borrarDireccion.ok) {
            const errorData = await borrarDireccion.json();
            console.log(errorData);
            return;
        }
        idDireccion = 0;
    }
    alert("¡Dirección Eliminada exitosamente!")
    location.reload()
}

document.getElementById("btn-delete-direccion").addEventListener("click", async () => {
    await eliminarDireccion();
})