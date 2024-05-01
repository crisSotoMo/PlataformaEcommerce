// SERVICIO PARA REGISTRAR USUARIO

const formRegistro = document.getElementById("formRegistro")

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
    let tipoIdentificacion = document.querySelector('input[name="tipoIdentificacionVendedor"]:checked');
    let identificacion = document.getElementById("numeroIdentificacionVendedor").value;
    let expresion;
    let error = false;

    if (!tipoIdentificacion) {
        error = true;
    } else {
        if (tipoIdentificacion.value === 'Nacional') {
            expresion = /^\d{9}$/;
        } else if (tipoIdentificacion.value === 'Extranjero') {
            expresion = /^\d{12}$/;
        }
        if (!expresion.test(identificacion)) {
            error = true;
            document.getElementById("numeroIdentificacionVendedor").classList.add('error');
        } else {
            document.getElementById("numeroIdentificacionVendedor").classList.remove('error');
        }
    }
    return error;
}

//Validar correo
const validarCorreo = () => {
    let correoInput = document.getElementById("correoElectronicoVendedor");
    let correo = correoInput.value;
    let error = false;
    let expresion = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!expresion.test(correo)) {
        correoInput.classList.add("error");
        error = true;
    } else {
        correoInput.classList.remove("error");
    }
    return error;
};

//Validar nombre
const validarNombre = () => {
    let nombreInput = document.getElementById("nombreVendedor");
    let nombre = nombreInput.value;
    let error = false;
    let expresion = /^[a-zA-Z\s]+$/;

    if (!expresion.test(nombre)) {
        nombreInput.classList.add("error");
        error = true;
    } else {
        nombreInput.classList.remove("error");
    }
    return error;
};

//Validar apellido
const validarApellido = () => {
    let apellidoInput = document.getElementById("apellidoVendedor");
    let apellido = apellidoInput.value;
    let error = false;
    let expresion = /^[a-zA-Z\s]+$/;

    if (!expresion.test(apellido)) {
        apellidoInput.classList.add("error");
        error = true;
    } else {
        apellidoInput.classList.remove("error");
    }
    return error;
};

// Validar teléfono
const validarTelefono = () => {
    let telefonoInput = document.getElementById("telefonoVendedor");
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

// Validar cuenta IBAN
const validarCuentaIban = () => {
    let cuentaIbanInput = document.getElementById("numeroCuentaIban");
    let cuentaIban = cuentaIbanInput.value;
    let error = false;
    let expresion = /^\d{16}$/;

    if (!expresion.test(cuentaIban)) {
        cuentaIbanInput.classList.add("error");
        error = true;
    } else {
        cuentaIbanInput.classList.remove("error");
    }
    return error;
};

// Validar fecha de nacimiento (mayor de 18 años)
const validarFechaNacimiento = () => {
    let fechaNacimientoInput = document.getElementById("fechaNacimiento");
    let fechaNacimiento = new Date(fechaNacimientoInput.value);
    let error = false;
    let fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        fechaNacimientoInput.classList.add("error");
        error = true;
    } else {
        fechaNacimientoInput.classList.remove("error");
    }
    return error;
};

// Obtener datos del formulario
const obtenerDatos = () => {
    debugger;
    let result = true;
    const camposVacios = validarCamposVacios();
    const errorIdentificacion = validarIdentificacion();
    const errorCorreo = validarCorreo();
    const errorNombre = validarNombre();
    const errorApellido = validarApellido();
    const errorTelefono = validarTelefono();
    const errorCuentaIban = validarCuentaIban();
    const errorFechaNacimiento = validarFechaNacimiento();

    if (
        camposVacios ||
        errorIdentificacion ||
        errorCorreo ||
        errorNombre ||
        errorApellido ||
        errorTelefono ||
        errorCuentaIban ||
        errorFechaNacimiento
    ) {
        result = false;
        let errorMessage = '';

        if (camposVacios) {
            errorMessage = 'Complete todos los campos.';
        } else if (errorIdentificacion) {
            errorMessage = 'El número de identificación es inválido.';
        } else if (errorCorreo) {
            errorMessage = 'El correo electrónico es inválido.';
        } else if (errorNombre || errorApellido) {
            errorMessage = 'El nombre y apellido deben contener solo letras.';
        } else if (errorTelefono) {
            errorMessage = 'El número de teléfono debe contener 8 dígitos.';
        } else if (errorCuentaIban) {
            errorMessage = 'El número de cuenta IBAN debe contener 16 dígitos.';
        } else if (errorFechaNacimiento) {
            errorMessage = 'El vendedor debe ser mayor de 18 años.';
        }

        Swal.fire({
            icon: "warning",
            title: "Error",
            text: errorMessage,
        });
    }
    return result;
};

// Evento para registrar vendedor
signInButton.addEventListener("click", async (evento) => {
    evento.preventDefault();
    const datosValidos = obtenerDatos();
    if (datosValidos) {
        await registro(evento);
    }
});

// SERVICIO PARA REGISTRAR USUARIO
async function registro(evento) {
    debugger;
    evento.preventDefault();
    // Guarda usuario
    const nombre = document.querySelector('#nombreVendedor').value;
    const apellido = document.querySelector('#apellidoVendedor').value;
    const tipoIdentificacion = document.querySelector('input[name="tipoIdentificacionVendedor"]:checked').value;
    const identificacion = document.querySelector('#numeroIdentificacionVendedor').value;
    const correo = document.querySelector('#correoElectronicoVendedor').value;
    const telefono = document.querySelector('#telefonoVendedor').value;
    const nombreComercio = document.querySelector('#nombreDelComercio').value;
    const numeroCuentaIban = document.querySelector('#numeroCuentaIban').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const rol = "vendedor";
    const contrasena = generarContrasenaTemporal();
    try {
        const respuesta = await fetch("http://localhost:3000/api/usuario/register_seller", {
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
                nombreComercio,
                numeroCuentaIban,
                fechaNacimiento,
                rol,
                contrasena,
            }),
        });
        const NewUser = await respuesta.json();

        const camposFormulario = [
            document.querySelector('#nombreVendedor'),
            document.querySelector('#apellidoVendedor'),
            document.querySelector('#numeroIdentificacionVendedor'),
            document.querySelector('#correoElectronicoVendedor'),
            document.querySelector('#telefonoVendedor'),
            document.querySelector('#nombreDelComercio'),
            document.querySelector('#numeroCuentaIban'),
            document.querySelector('#fechaNacimiento'),
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
