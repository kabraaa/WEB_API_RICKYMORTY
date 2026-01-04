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