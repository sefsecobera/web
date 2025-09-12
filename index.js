function cargarTarjetones() {
  const contenedor = document.getElementById("tarjetones");
  const data = JSON.parse(localStorage.getItem("tarjetones")) || [];
  contenedor.innerHTML = "";

  data.forEach(t => {
    const card = document.createElement("div");
    card.className = "tarjeton";
    card.innerHTML = `
      <img src="${t.imagen}" alt="Imagen de la escuela" />
      <div class="info">
        <strong>Escuela:</strong> ${t.escuela}<br>
        <strong>CUISE:</strong> ${t.cuise}
      </div>
    `;
    contenedor.appendChild(card);
  });

  iniciarCarruselAutomatico();
}

function iniciarCarruselAutomatico() {
  const contenedor = document.getElementById("tarjetones");

  setInterval(() => {
    const maxScroll = contenedor.scrollWidth - contenedor.clientWidth;
    const isAtEnd = contenedor.scrollLeft >= maxScroll;

    if (isAtEnd) {
      contenedor.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      contenedor.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, 3000);
}

window.onload = cargarTarjetones;
