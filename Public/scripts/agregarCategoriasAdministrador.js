"Use strict";

function agregarCategoria() {
  // Obtener el elemento select
  var selectElement = document.getElementById("categoriaAgregar");

  let categoria = selectElement.value;
  let expression = /^[a-zA-ZáéíóúñÑü\s]+$/;

  if (expression.test(categoria)) {
    Swal.fire({
      title: "Categoría agregada!",
      text: "La nueva categoría ha sido agregada",
      icon: "success",
    });
  } else {
    // Si no se ha escrito un nombre de categoria correctamente
    Swal.fire({
      title: "Nombre de categoría invalido",
      text: "Por favor escribe el nombre de la nueva categoría",
      icon: "warning",
    });
  }
}
