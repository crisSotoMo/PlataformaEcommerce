function agregarTarjeta() {
    var nombreTarjeta = document.getElementById("nombreTarjeta").value;
    var numeroTarjeta = document.getElementById("numeroTarjeta").value;
    var fechaVencimiento = document.getElementById("fechaVencimiento").value;
    var codigoSeguridad = document.getElementById("codigoSeguridad").value;

    // Verificar si algún campo está vacío
    if (nombreTarjeta === "" || numeroTarjeta === "" || fechaVencimiento === "" || codigoSeguridad === "") {
        Swal.fire({
            title: "Campos vacíos",
            text: "Por favor, complete todos los campos.",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else {
        // Validar que el número de tarjeta tiene exactamente 16 dígitos
        if (/^\d{16}$/.test(numeroTarjeta)) {
            // Validar la fecha de vencimiento
            var fechaActual = new Date();
            var fechaVencimientoArray = fechaVencimiento.split("-");
            var fechaVencimientoSeleccionada = new Date(fechaVencimientoArray[0], fechaVencimientoArray[1] - 1); // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11

            if (fechaVencimientoSeleccionada < fechaActual) {
                Swal.fire({
                    title: "Tarjeta vencida",
                    text: "La tarjeta está vencida.",
                    icon: "error",
                    confirmButtonText: "¡Entendido!",
                });
            } else {
                // Validar el código de seguridad
                if (/^\d{3}$/.test(codigoSeguridad)) {
                    // Reemplazar todos los números excepto los últimos cuatro con "X"
                    var numeroTarjetaOculto = "XXXX-XXXX-XXXX-" + numeroTarjeta.slice(-4);

                    // Mostrar el número de tarjeta oculto junto al ícono
                    var numeroTarjetaDisplay = document.getElementById("numeroTarjetaDisplay");
                    numeroTarjetaDisplay.innerText = numeroTarjetaOculto;

                    // Mostrar el ícono de tarjeta
                    var iconoTarjeta = document.querySelector('.container:nth-of-type(1) .inputsSections i');
                    iconoTarjeta.style.display = 'inline';

                    // Mensaje de éxito
                    Swal.fire({
                        title: "¡Tarjeta registrada exitosamente!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        title: "Código de seguridad incorrecto",
                        text: "El código de seguridad debe tener exactamente 3 dígitos.",
                        icon: "error",
                        confirmButtonText: "¡Entendido!",
                    });
                }
            }
        } else {
            Swal.fire({
                title: "Número de tarjeta incorrecto",
                text: "El número de tarjeta debe tener exactamente 16 dígitos.",
                icon: "error",
                confirmButtonText: "¡Entendido!",
            });
        }
    }
}

function eliminarTarjeta() {
    // Limpiar la información de la tarjeta en el primer div
    var numeroTarjetaDisplay = document.getElementById("numeroTarjetaDisplay");
    numeroTarjetaDisplay.innerText = "";

    Swal.fire({
        title: "Tarjeta eliminada",
        text: "La tarjeta ha sido eliminada correctamente.",
        icon: "success",
        confirmButtonText: "OK",
    });
}
