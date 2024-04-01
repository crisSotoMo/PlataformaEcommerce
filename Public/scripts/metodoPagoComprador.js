function agregarTarjeta() {
    var nombreTarjeta = document.getElementById("nombre-tarjeta").value;
    var numeroTarjeta = document.getElementById("numero-tarjeta").value;
    var fechaVencimiento = document.getElementById("fecha-vencimiento").value;
    var codigoSeguridad = document.getElementById("codigo-seguridad").value;

    if (nombreTarjeta === "" || numeroTarjeta === "" || fechaVencimiento === "" || codigoSeguridad === "") {
        alert("Por favor, complete todos los campos.");
    } else {
        alert("¡Tarjeta registrada exitosamente!");
    }
}
