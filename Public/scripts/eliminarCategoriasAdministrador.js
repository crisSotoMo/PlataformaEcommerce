"Use strict";

function eliminarCategoria() {
  // Obtener el elemento select
  var selectElement = document.getElementById("categoriaEliminar");

  if (selectElement.selectedIndex == 0) {
    // Si no se ha seleccionado ninguna opción, mostrar una alerta
    Swal.fire({
      title: "Selecciona una categoría",
      text: "Por favor seleccione una categoría",
      icon: "warning",
    });
  } else {
    Swal.fire({
      title: "Eliminar Categoría",
      text: "¿Estás seguro de que deseas eliminar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Categoría eliminada!",
          text: "La categoría seleccionada ha sido eliminada.",
          icon: "success",
        });
      }
    });
  }
}
