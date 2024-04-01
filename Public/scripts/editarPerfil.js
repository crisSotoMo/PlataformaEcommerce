"Use strict";

/*Validate Empty Fields*/
function validateEmptyFields() {
    let error = false;
    let requiredFields = document.querySelectorAll("input[required]");
    for (let i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value == "") {
            requiredFields[i].classList.add("error");
            error = true
        } else {
            requiredFields[i].classList.remove("error");
        }
    }
    return error;
}

/*Validate Profile Name*/
function validateName() {
    let error = false;
    let updateName = document.querySelector("#name").value;
    let expression = /^[a-zA-ZáéíóúñÑü\s]+$/;
    if (expression.test(updateName) == false) {
        profileName.classList.add("error");
        error = true;
    } else {
        profileName.classList.remove("error");
    }
    return error;
}

/*Validate Profile Last Name*/
function validateLastName() {
    let error = false;
    let updateLastName = document.querySelector("#lastName").value;
    let expression = /^[a-zA-ZáéíóúñÑü\s]+$/;
    if (expression.test(updateLastName) == false) {
        profileLastName.classList.add("error");
        error = true;
    } else {
        profileLastName.classList.remove("error");
    }
    return error;
}

/*Validate Profile Email*/
function validateEmail() {
    let error = false;
    let updateEmail = document.querySelector("#email").value;
    let expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (expression.test(updateEmail) == false) {
        profileEmail.classList.add("error");
        error = true;
    } else {
        profileEmail.classList.remove("error");
    }
    return error;
}

/*Validate Profile Phone*/
function validatePhone() {
    let error = false;
    let updatephone = document.querySelector("#phone").value;
    let expression = /^[0-9]{4}-[0-9]{4}$/;
    if (expression.test(updatephone) == false) {
        profilePhone.classList.add("error");
        error = true;
    } else {
        profilePhone.classList.remove("error");
    }
    return error;
}

/*Clean Form Fields*/
function cleanFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
}

/*Validate Form*/
function principalForm() {
    let requiredFieldsError = validateEmptyFields();
    let updateNameError = validateName();
    let updateLastNameError = validateLastName();
    let updateEmailError = validateEmail();
    let updatephoneError = validatePhone();
    if (requiredFieldsError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Debe completar todos los campos",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (updateNameError) {
        Swal.fire({
            title: "Nombre incorrecto",
            text: "Verifica que el nombre sea válido",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (updateLastNameError) {
        Swal.fire({
            title: "Apellido incorrecto",
            text: "Verifica que el apellido sea válido",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (updateEmailError) {
        Swal.fire({
            title: "Correo electrónico inválido",
            text: "Verifica que el correo electrónico sea válido",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (updatephoneError) {
        Swal.fire({
            title: "Teléfono inválido",
            text: "Verifica que el teléfono sea válido",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else {
        Swal.fire({
            title: "Información Correcta",
            text: "Su perfil ha sido actualizado",
            icon: "success",
            confirmButtonText: "OK"
        }).then(function () {
            cleanFields();
        });
    }
}