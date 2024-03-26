//CÓDIGO PARA EL SLIDER DE LA PÁGINA PRINCIPAL

//Se crea una función que ejecuta una serie de acciones cuando el DOM haya cargado.
document.addEventListener('DOMContentLoaded', function () {
    //Variable para almacenar el índice de la imagen actual.
    //Cuando tenemos un arreglo, recordar que va a iniciar en 0, siendo 0 la primera imagen, 1 la segunda y 2 la tercera.
    let currentSlide = 0;

    //Obtener elementos del DOM
    const sliderContainer = document.querySelector('.sliderContainer'); //Clase de la sección.
    const slide = document.querySelector('.slide'); //Clase del contenedor de las imágenes.
    const slides = slide.children; //Obtener imagenes del contenedor.
    const totalSlides = slides.length; //Obtener cuántas imágenes tenemos.
    const rightButton = document.getElementById('rightButton'); //ID del botón de avance.
    const leftButton = document.getElementById('leftButton'); //ID del botón de retroceso.

    // Calcular el ancho de la imagen y establecerlo
    const slideWidth = sliderContainer.offsetWidth; // Obtener el ancho del contenedor del slider.
    slide.style.width = `${slideWidth * totalSlides}px`; // Establecer el ancho de la imagen multiplicando el ancho del contenedor por el número total de imágenes y asignándolo como el valor de la propiedad CSS width.

    //Función para mostrar una imagen en el índice dado
    const showSlide = (index) => {
        const offset = -slideWidth * index; // Multiplicar el ancho de la imagen por el índice para obtener cuánto desplazarla horizontalmente.
        slide.style.transform = `translateX(${offset}px)`; // Mover la imagen horizontalmente aplicando el desplazamiento calculado.
    };

    //Event listener para el botón de retroceso cuando se le da click
    leftButton.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1; //Calcular el nuevo índice de la imagen a mostrar.
        showSlide(currentSlide); //Mostrar la imagen anterior.
    });

    //Event listener para el botón de avance cuando se le da click
    rightButton.addEventListener('click', () => {
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1; //Calcular el nuevo índice de la imagen a mostrar.
        showSlide(currentSlide); //Mostrar la siguiente imagen.
    });

    //Función flecha con un condicional para avanzar automáticamente al siguiente slide
    const autoAdvanceSlide = () => {
        if (currentSlide === totalSlides - 1) { //Verificar si estamos en la última imagen.
            //-1 debido a que hay que restarle un número, ya que los arreglos inician en 0.
            clearInterval(interval); //Detener rotación automática si es la última imagen.
        } else {
            currentSlide++; // Incrementar el índice de la imagen en 1.
            showSlide(currentSlide); // Mostrar la imagen actualizada.
        }
    };

    //Intervalo para cambiar de slide automáticamente cada 3 segundos (3000 milisegundos)
    //setInterval es una funcion que ejecuta repetidamente una función en un intervalo de tiempo.
    //autoAdvanceSlide es la función que creamos arriba.
    let interval = setInterval(autoAdvanceSlide, 3000);

    //Mostrar la primera imagen al cargar la página
    showSlide(currentSlide);
});
