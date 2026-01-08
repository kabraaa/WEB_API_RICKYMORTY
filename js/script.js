

// MENÚ HAMBURGUESA
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

if (hamburger && navbar) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("active");
  });
}





// SLIDESHOW
document.querySelectorAll("[data-slider]").forEach(slider => {
  const images = slider.querySelectorAll("img");
  const nextBtn = slider.querySelector(".next");
  const prevBtn = slider.querySelector(".prev");

  let index = 0;

  function showSlide(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % images.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto slide cada 5 segundos
  setInterval(nextSlide, 5000);
});





// CHARACTERS
// CHARACTERS
const contenedor = document.getElementById("lista-personajes");

let personajesCargados = 0;
let pagina = 1;
const MAX_PERSONAJES = 50;

function cargarPersonajes() {
  fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
    .then(response => response.json())
    .then(data => {

      data.results.forEach(personaje => {
        if (personajesCargados >= MAX_PERSONAJES) return;

        const div = document.createElement("div");
        div.classList.add("personaje");

        div.innerHTML = `
          <img src="${personaje.image}" alt="${personaje.name}">
          <div class="nombre">${personaje.name}</div>
        `;

        contenedor.appendChild(div);
        personajesCargados++;
      });

      // Si aún no llegamos a 50, cargamos la siguiente página
      if (personajesCargados < MAX_PERSONAJES && data.info.next) {
        pagina++;
        cargarPersonajes();
      }
    });
}

cargarPersonajes();





const episodesContainer = document.createElement("div");
episodesContainer.id = "episodes-list";
document.querySelector("#episodes-section").appendChild(episodesContainer);

const searchInput = document.getElementById("episode-search");
const searchBtn = document.getElementById("search-btn");

let episodes = [];

// Cargar todos los episodios
async function loadEpisodes() {
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const data = await res.json();
    episodes = episodes.concat(data.results);
    page++;
    hasNext = data.info.next !== null;
  }

  // Añadir imagen de ejemplo por episodio
  // Usaremos una imagen fija o la del primer personaje si existe
  for (let ep of episodes) {
    if (ep.characters && ep.characters.length > 0) {
      try {
        const charRes = await fetch(ep.characters[0]);
        const charData = await charRes.json();
        ep.image = charData.image;
      } catch {
        ep.image = "https://via.placeholder.com/300x170?text=Episode";
      }
    } else {
      ep.image = "https://via.placeholder.com/300x170?text=Episode";
    }
  }

  renderEpisodesBySeason(episodes);
}

// Renderizar por temporada con marquesina
function renderEpisodesBySeason(list) {
  const seasons = {};

  list.forEach(ep => {
    const seasonNum = ep.episode.slice(1, 3);
    if (!seasons[seasonNum]) seasons[seasonNum] = [];
    seasons[seasonNum].push(ep);
  });

  episodesContainer.innerHTML = "";

  Object.keys(seasons).sort().forEach(seasonNum => {
    const seasonDiv = document.createElement("div");
    seasonDiv.classList.add("season-block");

    const title = document.createElement("h3");
    title.textContent = `Temporada ${parseInt(seasonNum)}`;
    seasonDiv.appendChild(title);

    const marquee = document.createElement("div");
    marquee.classList.add("season-marquee");

    seasons[seasonNum].forEach(ep => {
      const epDiv = document.createElement("div");
      epDiv.classList.add("episode");
      epDiv.innerHTML = `
        <img src="${ep.image}" alt="${ep.name}">
        <div class="episode-info">
          <h4>${ep.episode} - ${ep.name}</h4>
          <p>Air Date: ${ep.air_date}</p>
        </div>
      `;
      marquee.appendChild(epDiv);
    });

    seasonDiv.appendChild(marquee);
    episodesContainer.appendChild(seasonDiv);
  });
}

// Función de búsqueda
function searchEpisodes() {
  const query = searchInput.value.toLowerCase();
  const filtered = episodes.filter(ep => ep.name.toLowerCase().includes(query));
  renderEpisodesBySeason(filtered);
}

// Eventos
searchBtn.addEventListener("click", searchEpisodes);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchEpisodes();
});

loadEpisodes();


