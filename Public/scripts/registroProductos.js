"Use strict";

/*DOM Reference*/
const photo = document.querySelector("#productPhoto");
const photoButton = document.querySelector("#uploadPhotoButton");
const productName = document.querySelector("#productName");
const descripcion = document.querySelector("#description");
const productCategory = document.querySelector("#productCategory");
const addProductBtn = document.querySelector("#addProduct");


/*Validate Empty Fields*/
function validateEmptyFields() {
  let error = false;
  let requiredFields = document.querySelectorAll("input[required]");
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

/*Validate Product Category*/
function validateCategory() {
    let error = false;
    let product = productCategory.value;
    if (product == "") {
        productName.classList.add("error");
        error = true;
    } else {
        productName.classList.remove("error");
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

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dqceegh2x",
    uploadPreset: "products_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        photo.src = result.info.secure_url;
    }
});

/*Validate Form*/
function principalForm() {
    let requiredFieldsError = validateEmptyFields();
    let productError = validateProductName();
    let categoryError = validateCategory();
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
    } else if (categoryError) {
        Swal.fire({
            title: "Categoría inválida",
            text: "Verifica que la categoría seleccionada sea válida",
            icon: "warning",
            confirmButtonText: "¡Entendido!",
        });
    } else {
        let fotoProducto = photo.src;
        let nombreProducto = productName.value;
        let descripcionProducto = descripcion.value;
        let categoriaProducto = productCategory.value;
        
        registro_producto(categoriaProducto, nombreProducto, fotoProducto,descripcionProducto);
        //cleanFields();

        /*Swal.fire({
            title: "Información Correcta",
            text: "Su producto ha sido agregado al inventario",
            icon: "success",
            confirmButtonText: "OK"
        });*/
    }
}

/*Action Button*/
addProductBtn.addEventListener("click", principalForm);
photoButton.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);
