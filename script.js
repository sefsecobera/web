let index = 0;
const totalFichas = document.querySelectorAll('.ficha').length;

function moveSlide(step) {
  index += step;

  if (index >= totalFichas) {
    index = 0;  // Volver al principio
  } else if (index < 0) {
    index = totalFichas - 1;  // Ir al final
  }

  updateCarousel();
}

// Actualizar el carrusel moviendo el contenedor
function updateCarousel() {
  const carrusel = document.querySelector('.carrusel');
  carrusel.style.transform = `translateX(-${index * 320}px)`; // 320px es el ancho de una ficha + márgenes
}

// Deslizamiento automático cada 3 segundos
setInterval(() => {
  moveSlide(1);
}, 3000);
