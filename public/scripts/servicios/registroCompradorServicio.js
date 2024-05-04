//SERVICIO PARA REGISTRAR USUARIO

const formRegistro = document.getElementById("formRegistro");
const userPhoto = document.querySelector("#foto-usuario");
const userPhotoButton = document.querySelector("#btn-subir-foto");

//Generar contraseña aleatoria
const generarContrasenaTemporal = () => {
    const longitud = 8;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let contrasenaTemporal = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasenaTemporal += caracteres.charAt(indice);
    }
    return contrasenaTemporal;
};

//Validar campos vacíos
const validarCamposVacios = () => {
    let campos_requeridos = document.querySelectorAll("#formRegistro [required]");
    let error = false;

    campos_requeridos.forEach(campo => {
        if (campo.value === '') {
            error = true;
            campo.classList.add('error');
        } else {
            campo.classList.remove('error');
        }
    });

    return error;
}

//Validar identificación
const validarIdentificacion = () => {
    let tipoIdentificacion = document.querySelector('input[name="tipoIdentificacionComprador"]:checked');
    let identificacion = document.getElementById("numeroIdentificacionComprador").value;
    let expresion;
    let error = false;

    if (!tipoIdentificacion) {
        error = false;
    }

    else {
        if (tipoIdentificacion.value === 'nacional') {
            expresion = /^\d{9}$/;
        }
        else if (tipoIdentificacion.value === 'extranjero') {
            expresion = /^\d{12}$/;
        }
        if (expresion.test(identificacion) === false) {
            error = true;
            document.getElementById("numeroIdentificacionComprador").classList.add('error');
        } else {
            document.getElementById("numeroIdentificacionComprador").classList.remove('error');
        }
    }
    return error;
}

//Validar correo
const validar_correo = () => {
    let correoInput = document.getElementById("correoElectronicoComprador");
    let correo = correoInput.value;
    let error = false;
    let expresion = /^[a-zA-Z0-9.]+\@*[a-zA-Z0-9]*\@{1}[a-zA-Z]+.com$/;
    if (expresion.test(correo) == false) {
        correoInput.classList.add("error");
        error = true;
    } else {
        correoInput.classList.remove("error");
    }
    return error;
};

//Validar nombre
const validar_nombre = () => {
    let nombreInput = document.getElementById("nombreComprador");
    let nombre = nombreInput.value;
    let error = false;
    let expresion = /^[a-zA-Z\s]+$/;


    if (expresion.test(nombre) == false) {
        nombreInput.classList.add("error");
        error = true;
    } else {
        nombreInput.classList.remove("error");
    }
    return error;
};


//Validar apellido
const validar_apellido = () => {
    let apellidoInput = document.getElementById("apellidoComprador");
    let apellido = apellidoInput.value;
    let error = false;
    let expresion = /^[a-zA-Z\s]+$/;
    if (expresion.test(apellido) == false) {
        apellidoInput.classList.add("error");
        error = true;
    } else {
        apellidoInput.classList.remove("error");
    }
    return error;
};

// Validar teléfono
const validar_telefono = () => {
    let telefonoInput = document.getElementById("telefonoComprador");
    let telefono = telefonoInput.value;
    let error = false;
    let expresion = /^\d{8}$/;
    if (!expresion.test(telefono)) {
        telefonoInput.classList.add("error");
        error = true;
    } else {
        telefonoInput.classList.remove("error");
    }
    return error;
};

//Validar datos
const obtener_datos = () => {
    debugger;
    let result;
    const camposVacios = validarCamposVacios();
    const errorIdenficacion = validarIdentificacion();
    const errorCorreo = validar_correo();
    const errorNombre = validar_nombre();
    const errorApellido = validar_apellido();
    const errorTelefono = validar_telefono();

    if (camposVacios || errorNombre || errorApellido || errorIdenficacion || errorCorreo || errorTelefono) {
        result = false;
        if (camposVacios) {
            Swal.fire({
                icon: "warning",
                title: "Campos en blanco",
                text: "Complete los espacios en blanco",
            });
        } else if (errorNombre || errorApellido) {
            Swal.fire({
                icon: "warning",
                title: "Nombre o apellido no es válido",
                text: "El nombre o apellido solo deben contener letras ",
            });

        } else if (errorIdenficacion) {
            Swal.fire({
                icon: "warning",
                title: "Identificacion no es válida",
                text: "La identificacion solo debe contener 9 numeros ",
            });

        } else if (errorCorreo) {
            Swal.fire({
                icon: "warning",
                title: "Correo no es válido",
                text: "Por favor ingrese un correo válido",
            });

        } else if (errorTelefono) {
            Swal.fire({
                icon: "warning",
                title: "Telefono no es válido",
                text: "El telefono solo debe contener 8 numeros",
            });
        }

    } else {
        Swal.fire({
            icon: "success",
            title: "Información de registro:",
            text: "Usuario registrado con éxito",
        });
        result = true;
    }
    return result;
}

//Evento para registrar usuario
signInButton.addEventListener("click", async (evento) => {
    debugger;
    evento.preventDefault();
    const datosValidos = obtener_datos();
    if (datosValidos) {
        await registro(evento);
    }
});

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dqceegh2x",
    uploadPreset: "sellers_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        userPhoto.src = result.info.secure_url;
    }
});

//SERVICIO PARA REGISTRAR USUARIO
async function registro(evento) {
    debugger;
    evento.preventDefault();
    // Guarda usuario
    const nombre = document.querySelector('#nombreComprador').value;
    const apellido = document.querySelector('#apellidoComprador').value;
    const tipoIdentificacion = document.querySelector('input[name="tipoIdentificacionComprador"]:checked').value;
    const identificacion = document.querySelector('#numeroIdentificacionComprador').value;
    const correo = document.querySelector('#correoElectronicoComprador').value;
    const telefono = document.querySelector('#telefonoComprador').value;
    const rol = "comprador";
    const contrasena = generarContrasenaTemporal();
    const foto = userPhoto.src;
    try {
        const respuesta = await fetch("http://localhost:3000/api/usuario/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                apellido,
                tipoIdentificacion,
                identificacion,
                correo,
                telefono,
                rol,
                contrasena,
                foto
            }),
        });
        const NewUser = await respuesta.json();

        const camposFormulario = [
            document.querySelector('#nombreComprador'),
            document.querySelector('#apellidoComprador'),
            document.querySelector('#numeroIdentificacionComprador'),
            document.querySelector('#correoElectronicoComprador'),
            document.querySelector('#telefonoComprador'),
        ];
        camposFormulario.forEach(campo => {
            if (campo) {
                campo.value = '';
                campo.classList.remove('error');
            }
        });
        result = true;
    } catch (error) {
        console.error(error);
    }
}

/*Action Button*/
userPhotoButton.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);

