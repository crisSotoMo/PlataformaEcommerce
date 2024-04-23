"Use strict";

/*DOM Reference*/
const productName = document.querySelector("#productName");
const productQuantity = document.querySelector("#quantity");
const productPrice = document.querySelector("#price");
const productTax = document.querySelector("#tax");
const addProductBtn = document.querySelector("#addProduct");

/*Validate Empty Fields*/
function validateEmptyFields() {
  let error = false;
  let requiredFields = document.querySelectorAll("Input [required]");
  for (let i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].value == "") {
      requiredFields[i].classList.add("error");
      error = true;
    } else {
      requiredFields[i].classList.remove("error");
    }
  }
  return error;
}

/*Validate Product Name*/
function validateProductName() {
    let error = false;
    let product = productName.value;
    let expression = /^[a-zA-ZáéíóúñÑü\s]+$/;
    if (expression.test(product) == false) {
        productName.classList.add("error");
        error = true;
    } else {
        productName.classList.remove("error");
    }
    return error;
}

/*Validate Product Quantity*/
function validateProductQuantity() {
    let error = false;
    let totalQuantity = productQuantity.value;
    let expression = /^[1-9][0-9]?$|^100$/;
    if (expression.test(totalQuantity) == false) {
        productQuantity.classList.add("error");
        error = true;
    } else {
        productQuantity.classList.remove("error");
    }
    return error;
}

/*Validate Product Price*/
function validateProductPrice() {
    let error = false;
    let originalPrice = productPrice.value;
    let expression = /^[1-9][0-9]*$/;
    if (expression.test(originalPrice) == false) {
        productPrice.classList.add("error");
        error = true;
    } else {
        productPrice.classList.remove("error");
    }
    return error;
}

/*Validate Product Tax*/
function validateProductTax() {
    let error = false;
    let addedTax = productTax.value;
    let expression = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;
    if (expression.test(addedTax) == false) {
        productTax.classList.add("error");
        error = true;
    } else {
        productTax.classList.remove("error");
    }
    return error;
}

/*Clean Form Fields*/
/*function cleanFields() {
    profileName.value = "";
    profileLastName.value = "";
    profileEmail.value = "";
    profilePhone.value = "";
}*/

/*Validate Form*/
function principalForm() {
    let requiredFieldsError = validateEmptyFields();
    let productError = validateProductName();
    let totalQuantityError = validateProductQuantity();
    let originalPriceError = validateProductPrice();
    let addedTaxError = validateProductTax();
    if (requiredFieldsError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Debe completar todos los campos",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (productError) {
        Swal.fire({
            title: "Nombre inválido",
            text: "Verifica que el nombre sea válido",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (totalQuantityError) {
        Swal.fire({
            title: "Cantidad incorrecta",
            text: "Verifica que sea un número menor o igual a 100",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (originalPriceError) {
        Swal.fire({
            title: "Precio inválido",
            text: "Verifica que el precio no tenga decimales",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else if (addedTaxError) {
        Swal.fire({
            title: "Impuesto inválido",
            text: "Verifica que el impuesto sea válido",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else {
        Swal.fire({
            title: "Información Correcta",
            text: "Su producto ha sido agregado al inventario",
            icon: "success",
            confirmButtonText: "OK"
        });
    }
    /*cleanFields();*/
}

/*Action Button*/
addProductBtn.addEventListener("click", principalForm)