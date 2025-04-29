function cargarTarjetones() {
    const contenedor = document.getElementById("tarjetones");
    const data = JSON.parse(localStorage.getItem("tarjetones")) || [];
    contenedor.innerHTML = "";
  
    data.forEach(t => {
      const card = document.createElement("div");
      card.className = "tarjeton";
      card.innerHTML = `
        <h3>${t.titulo}</h3>
        <p>${t.descripcion}</p>
        <img src="${t.imagen}" alt="Imagen" />
      `;
      contenedor.appendChild(card);
    });
  
    iniciarCarruselAutomatico();
  }
  
  function moverCarrusel(direccion) {
    const contenedor = document.getElementById("tarjetones");
    contenedor.scrollBy({ left: direccion * 300, behavior: 'smooth' });
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
    }, 3000); // Cada 3 segundos
  }
  
  window.onload = cargarTarjetones;