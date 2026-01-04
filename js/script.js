// MENÚ HAMBURGUESA
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

if (hamburger && navbar) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("active");
  });
}





// CHARACTERS
const contenedor = document.getElementById("lista-personajes");

fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => {

    data.results.forEach(personaje => {

      const div = document.createElement("div");
      div.classList.add("personaje");

      div.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}">
        <div class="nombre">${personaje.name}</div>
      `;

      contenedor.appendChild(div);
    });
  });