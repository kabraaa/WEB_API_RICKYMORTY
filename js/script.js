




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





// EPISODIOS
const episodesContainer = document.createElement("div");
episodesContainer.id = "episodes-list";
document.querySelector("#episodes-section").appendChild(episodesContainer);

const searchInput = document.getElementById("episode-search");
const searchBtn = document.getElementById("search-btn");

let episodes = [];

// Imágenes generales (opcional, se usarán si no tienes una específica)
const generalImages = [
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  "https://rickandmortyapi.com/api/character/avatar/5.jpeg"
];

// Mapeo de episodios a tus imágenes personalizadas
const customImages = {
  // Temporada 1 (11 episodios)
  "S01E01": "media/episodios/1.webp",
  "S01E02": "media/episodios/2.webp",
  "S01E03": "media/episodios/3.webp",
  "S01E04": "media/episodios/4.webp",
  "S01E05": "media/episodios/5.webp",
  "S01E06": "media/episodios/6.webp",
  "S01E07": "media/episodios/7.webp",
  "S01E08": "media/episodios/8.webp",
  "S01E09": "media/episodios/9.webp",
  "S01E10": "media/episodios/10.webp",
  "S01E11": "media/episodios/11.webp",

  // Temporada 2 (10 episodios)
  "S02E01": "media/episodios/12.webp",
  "S02E02": "media/episodios/13.webp",
  "S02E03": "media/episodios/14.webp",
  "S02E04": "media/episodios/15.webp",
  "S02E05": "media/episodios/16.webp",
  "S02E06": "media/episodios/17.webp",
  "S02E07": "media/episodios/18.webp",
  "S02E08": "media/episodios/19.webp",
  "S02E09": "media/episodios/20.webp",
  "S02E10": "media/episodios/21.webp",

  // Temporada 3 (10 episodios)
  "S03E01": "media/episodios/22.webp",
  "S03E02": "media/episodios/23.webp",
  "S03E03": "media/episodios/24.webp",
  "S03E04": "media/episodios/25.webp",
  "S03E05": "media/episodios/26.webp",
  "S03E06": "media/episodios/27.webp",
  "S03E07": "media/episodios/28.webp",
  "S03E08": "media/episodios/29.webp",
  "S03E09": "media/episodios/30.webp",
  "S03E10": "media/episodios/31.webp",

  // Temporada 4 (10 episodios)
  "S04E01": "media/episodios/32.webp",
  "S04E02": "media/episodios/33.webp",
  "S04E03": "media/episodios/34.webp",
  "S04E04": "media/episodios/35.webp",
  "S04E05": "media/episodios/36.webp",
  "S04E06": "media/episodios/37.webp",
  "S04E07": "media/episodios/38.webp",
  "S04E08": "media/episodios/39.webp",
  "S04E09": "media/episodios/40.webp",
  "S04E10": "media/episodios/41.webp",

  // Temporada 5 (10 episodios)
  "S05E01": "media/episodios/42.webp",
  "S05E02": "media/episodios/43.webp",
  "S05E03": "media/episodios/44.webp",
  "S05E04": "media/episodios/45.webp",
  "S05E05": "media/episodios/46.webp",
  "S05E06": "media/episodios/47.webp",
  "S05E07": "media/episodios/48.webp",
  "S05E08": "media/episodios/49.webp",
  "S05E09": "media/episodios/50.webp",
  "S05E10": "media/episodios/51.webp"
};

// CARGAR TODOS LOS EPISODIOS
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

  // ASIGNAR IMAGENES PERSONALIZADAS O GENERALES
  episodes.forEach(ep => {
    if (customImages[ep.episode]) {
      ep.image = customImages[ep.episode]; // tu imagen específica
    } else {
      const randomIndex = Math.floor(Math.random() * generalImages.length);
      ep.image = generalImages[randomIndex]; // fallback general
    }
  });

  renderEpisodesBySeason(episodes);
}

// RENDERIZAR EPISODIOS POR TEMPORADA
function renderEpisodesBySeason(list) {
  const seasons = {};

  list.forEach(ep => {
    const seasonNum = parseInt(ep.episode.match(/\d+/)[0]); // extrae número de temporada
    if (!seasons[seasonNum]) seasons[seasonNum] = [];
    seasons[seasonNum].push(ep);
  });

  episodesContainer.innerHTML = "";

  Object.keys(seasons).sort().forEach(seasonNum => {
    const seasonDiv = document.createElement("div");
    seasonDiv.classList.add("season-block");

    const title = document.createElement("h3");
    title.textContent = `Temporada ${seasonNum}`;
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

// BÚSQUEDA DE EPISODIOS
function searchEpisodes() {
  const query = searchInput.value.toLowerCase();
  const filtered = episodes.filter(ep => ep.name.toLowerCase().includes(query));
  renderEpisodesBySeason(filtered);
}

// EVENTOS
searchBtn.addEventListener("click", searchEpisodes);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchEpisodes();
});

// INICIAR CARGA
loadEpisodes();


















