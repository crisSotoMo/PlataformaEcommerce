function agregarCuenta() {
    var nuevaCuenta = document.getElementById("nuevaCuenta").value;

    if (nuevaCuenta === "") {
        alert("Por favor, complete todos los campos.");
    } else {
        alert("¡Cuenta registrada exitosamente!");
    }
}
