document.getElementById("formularioImagen").addEventListener("submit", function (e) {
  e.preventDefault();

  const escuela = this.escuela.value.trim();
  const cuise = this.cuise.value.trim();
  const imagen = this.imagen.files[0];

  if (!imagen || !escuela || !cuise) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = function () {
    const base64Data = reader.result.split(',')[1]; // Eliminar encabezado data:image/...

    // Reemplazá esta URL con la de tu Web App
    const URL_WEB_APP = "https://script.google.com/macros/s/AKfycbwexYr8FFoiLoQ7o_TLKNfRpJWOc8PObkr2NWFbXzD_gjuDS6KuxKQqtPzijDVY30HS/exec");

    const formData = new URLSearchParams();
    formData.append("imagen", base64Data);
    formData.append("tipo", imagen.type);
    formData.append("nombre", imagen.name);
    formData.append("escuela", escuela);
    formData.append("cuise", cuise);

    fetch(URL_WEB_APP, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        const nuevoItem = {
          escuela,
          cuise,
          imagen: data.url
        };

        const tarjetones = JSON.parse(localStorage.getItem("tarjetones")) || [];
        tarjetones.push(nuevoItem);
        localStorage.setItem("tarjetones", JSON.stringify(tarjetones));

        document.getElementById("mensaje").textContent = "Imagen subida correctamente.";
        document.getElementById("formularioImagen").reset();
      } else {
        alert("Error al subir: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al subir la imagen.");
    });
  };

  reader.readAsDataURL(imagen);
});



