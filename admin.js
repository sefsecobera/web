const form = document.getElementById("formTarjeton");
const lista = document.getElementById("listaTarjetones");
let editIndex = null;

function renderTarjetones() {
  const data = JSON.parse(localStorage.getItem("tarjetones")) || [];
  lista.innerHTML = "";

  data.forEach((t, i) => {
    const card = document.createElement("div");
    card.className = "tarjeton";
    card.innerHTML = `
      <h3>${t.titulo}</h3>
      <p>${t.descripcion}</p>
      <img src="${t.imagen}" alt="Imagen" />
      <button onclick="editar(${i})">Editar</button>
      <button onclick="eliminar(${i})">Eliminar</button>
    `;
    lista.appendChild(card);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;

  const data = JSON.parse(localStorage.getItem("tarjetones")) || [];

  const nuevo = { titulo, descripcion, imagen };

  if (editIndex !== null) {
    data[editIndex] = nuevo;
    editIndex = null;
  } else {
    data.push(nuevo);
  }

  localStorage.setItem("tarjetones", JSON.stringify(data));
  form.reset();
  renderTarjetones();
};

function editar(i) {
  const data = JSON.parse(localStorage.getItem("tarjetones"));
  const t = data[i];
  document.getElementById("titulo").value = t.titulo;
  document.getElementById("descripcion").value = t.descripcion;
  document.getElementById("imagen").value = t.imagen;
  editIndex = i;
}

function eliminar(i) {
  const data = JSON.parse(localStorage.getItem("tarjetones"));
  data.splice(i, 1);
  localStorage.setItem("tarjetones", JSON.stringify(data));
  renderTarjetones();
}

window.onload = renderTarjetones;