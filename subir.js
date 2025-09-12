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
    const base64Data = reader.result.split(',')[1];

    // ✅ Reemplazá con tu propia URL de Web App de Google Apps Script
    const URL_WEB_APP = "https://script.google.com/macros/s/1U6p-a2lFfD1A69GBW5kXRn26t06Z_Ecx";


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




