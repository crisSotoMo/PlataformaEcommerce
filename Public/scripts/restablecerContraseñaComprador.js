"Use strict";

/*DOM Reference*/
const passwordActTemp = document.querySelector("#currentPassword");
const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmNewPassword");
const saveBtn = document.querySelector("#saveButton");

/*Validate Empty Fields*/
function validateEmptyFields() {
    let error = false;
    let requiredFields = document.querySelectorAll("#restorePassword [required]");
    for (let i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value == "") {
            requiredFields[i].classList.add("error");
            error = true
        }else{
            requiredFields[i].classList.remove("error");
        }
    }
    return error;
}

/*Validate Current/Temporary Password*/
function validateCurrentPassword() {
    let error = false;
    let currentPasswordInput = passwordActTemp.value;
    let expression = /^(?=.{8,}$)(?=[^aeiou]*)(?=.*[BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz])(?=.*[0-9])(?=.*[@#$%^&+=*-_]).*$/;
    if (expression.test(currentPasswordInput) == false) {
        passwordActTemp.classList.add("error");
        error = true;
    }else{
        passwordActTemp.classList.remove("error");
    }
    return error;
}

/*Validate New Password*/
function validateNewPassword() {
    let error = false;
    let newPasswordInput = newPassword.value;
    let expression = /^(?=.{8,}$)(?=[^aeiou]*)(?=.*[BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz])(?=.*[0-9])(?=.*[@#$%^&+=*-_]).*$/;
    if (expression.test(newPasswordInput) == false) {
        newPassword.classList.add("error");
        error = true;
    }else{
        newPassword.classList.remove("error");
    }
    return error;
}

/*Validate Confirm Password*/
function validateConfirmPassword() {
    let error = false;
    let newPasswordInput = newPassword.value;
    let confirmPasswordInput = confirmPassword.value;
    if (newPasswordInput !== confirmPasswordInput) {
      confirmPassword.classList.add("error");
      error = true;
    }else{
      confirmPassword.classList.remove("error");
    }
    return error;
}

/*Clean Form Fields*/
function cleanFields() {
    passwordActTemp.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
}

/*Validate Form*/
function principalForm() {
    let requiredFieldsError = validateEmptyFields();
    let passwordActTempError = validateCurrentPassword();
    let newPasswordError = validateNewPassword();
    let confirmPasswordError = validateConfirmPassword();
    if (requiredFieldsError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Debe completar todos los campos",
            icon: "warning",
            confirmButtonText:"¡Entendido!",
        });
    }else if(passwordActTempError) {
        Swal.fire({
            title: "Contraseña incorrecta",
            text: "Verifica que sea la contraseña correcta",
            icon: "warning",
            confirmButtonText:"¡Entendido!",
        });
    }else if (newPasswordError) {
        Swal.fire({
            title: "Contraseña no permitida",
            text: "La contraseña no cumple con el formato: Mínimo 8 carácteres, sólo consonantes, al menos un número y al menos un carácter especial",
            icon: "warning",
            confirmButtonText:"¡Entendido!",
        });
    }else if (confirmPasswordError) {
        Swal.fire({
            title: "Contraseña no permitida",
            text: "La contraseña no coincide",
            icon: "warning",
            confirmButtonText:"¡Entendido!",
        });
    }else{
        Swal.fire({
            title: "Contraseña correcta",
            text: "La contraseña ha sido actualizada",
            icon: "success",
            confirmButtonText: "OK",
        });
    }
    
    cleanFields();
}

/*Action Button*/
saveBtn.addEventListener("click", principalForm);