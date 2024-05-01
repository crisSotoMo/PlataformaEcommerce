//SERVICIO PARA REGISTRAR USUARIO

const formRegistro = document.getElementById("formRegistro")

// Generar contraseña aleatoria
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

// Validar campos vacíos
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

// Validar identificación
const validarIdentificacion = () => {
    let tipoIdentificacion = document.querySelector('input[name="tipoIdentificacionAdministrador"]:checked');
    let identificacion = document.getElementById("numeroIdentificacionAdministrador").value;
    let expresion;
    let error = false;

    if (!tipoIdentificacion) {
        error = false;
    } else {
        if (tipoIdentificacion.value === 'Nacional') {
            expresion = /^\d{9}$/;
        } else if (tipoIdentificacion.value === 'Extranjero') {
            expresion = /^\d{12}$/;
        }
        if (expresion.test(identificacion) === false) {
            error = true;
            document.getElementById("numeroIdentificacionAdministrador").classList.add('error');
        } else {
            document.getElementById("numeroIdentificacionAdministrador").classList.remove('error');
        }
    }
    return error;
}

// Validar correo
const validar_correo = () => {
    let correoInput = document.getElementById("correoElectronicoAdministrador");
    let correo = correoInput.value;
    let error = false;
    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (expresion.test(correo) == false) {
        correoInput.classList.add("error");
        error = true;
    } else {
        correoInput.classList.remove("error");
    }
    return error;
};

// Validar nombre
const validar_nombre = () => {
    let nombreInput = document.getElementById("nombreAdministrador");
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

// Validar apellido
const validar_apellido = () => {
    let apellidoInput = document.getElementById("apellidoAdministrador");
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
    let telefonoInput = document.getElementById("telefonoAdministrador");
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

// Validar datos
const obtener_datos = () => {
    let result;
    const camposVacios = validarCamposVacios();
    const errorIdentificacion = validarIdentificacion();
    const errorCorreo = validar_correo();
    const errorNombre = validar_nombre();
    const errorApellido = validar_apellido();
    const errorTelefono = validar_telefono();

    if (camposVacios || errorNombre || errorApellido || errorIdentificacion || errorCorreo || errorTelefono) {
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
                title: "Nombre o apellido no válido",
                text: "El nombre o apellido solo deben contener letras ",
            });

        } else if (errorIdentificacion) {
            Swal.fire({
                icon: "warning",
                title: "Identificación no válida",
                text: "La identificación debe contener 9 números (para CÉDULA) o 12 números (para DIMEX)",
            });

        } else if (errorCorreo) {
            Swal.fire({
                icon: "warning",
                title: "Correo no válido",
                text: "Por favor ingrese un correo válido",
            });

        } else if (errorTelefono) {
            Swal.fire({
                icon: "warning",
                title: "Teléfono no válido",
                text: "El teléfono debe contener 8 números",
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

// Evento para registrar usuario
signInButton.addEventListener("click", async (evento) => {
    evento.preventDefault();
    const datosValidos = obtener_datos();
    if (datosValidos) {
        await registro(evento);
    }
});

// SERVICIO PARA REGISTRAR USUARIO
async function registro(evento) {
    evento.preventDefault();
    // Guarda usuario
    const nombre = document.querySelector('#nombreAdministrador').value;
    const apellido = document.querySelector('#apellidoAdministrador').value;
    const tipoIdentificacion = document.querySelector('input[name="tipoIdentificacionAdministrador"]:checked').value;
    const identificacion = document.querySelector('#numeroIdentificacionAdministrador').value;
    const correo = document.querySelector('#correoElectronicoAdministrador').value;
    const telefono = document.querySelector('#telefonoAdministrador').value;
    const rol = "administrador";
    const contrasena = generarContrasenaTemporal();
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
            }),
        });
        const NewUser = await respuesta.json();

        const camposFormulario = [
            document.querySelector('#nombreAdministrador'),
            document.querySelector('#apellidoAdministrador'),
            document.querySelector('#numeroIdentificacionAdministrador'),
            document.querySelector('#correoElectronicoAdministrador'),
            document.querySelector('#telefonoAdministrador'),
        ];
        camposFormulario.forEach(campo => {
            if (campo) {
                campo.value = '';
                campo.classList.remove('error');
            }
        });
    } catch (error) {
        console.error(error);
    }
}
