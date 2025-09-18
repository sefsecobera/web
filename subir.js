document.getElementById("formularioImagen").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const escuela = form.escuela.value.trim();
  const cuise = form.cuise.value.trim();
  const imagen = form.imagen.files[0];

  if (!escuela || !cuise || !imagen) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const lector = new FileReader();
  lector.onload = function () {
    const base64 = lector.result.split(",")[1]; // sacamos el encabezado del dataURL

    const payload = {
      escuela: escuela,
      cuise: cuise,
      nombre: imagen.name,
      tipo: imagen.type,
      archivo: base64
    };

    const URL_WEB_APP = "https://script.google.com/macros/s/AKfycbyTb7u8Fjk3Ts7V6UYU_AT8mnNuHZHJcePVl6gnVxvduqsxVBB6jgdkOqesnWeYHgyT/exec";

    fetch(URL_WEB_APP, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          document.getElementById("mensaje").textContent = "Imagen subida correctamente.";
          form.reset();
        } else {
          alert("Error al subir: " + data.message);
        }
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Error al subir la imagen.");
      });
  };

  lector.readAsDataURL(imagen);
});






