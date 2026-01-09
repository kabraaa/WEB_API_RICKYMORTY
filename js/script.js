




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
const customCharacterImages = {
  "Antenna Rick": "media/antenna-rick.webp",
};

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

        div.dataset.id = personaje.id;

        div.innerHTML = `
  <img src="${customCharacterImages[personaje.name] || personaje.image}" alt="${personaje.name}">
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



// ===============================
// BÚSQUEDA DE PERSONAJES (AISLADA)
// ===============================
(function () {

  const section = document.querySelector("#personajes");
  if (!section) return;

  const searchContainer = section.querySelector(".search-container");
  const input = searchContainer.querySelector("#character-search");
  const button = searchContainer.querySelector("button");
  const container = document.getElementById("lista-personajes");

  if (!input || !button || !container) return;

  let characters = [];

  // Detectar cuando se cargan personajes dinámicamente
  const observer = new MutationObserver(() => {
    characters = Array.from(container.querySelectorAll(".personaje"));
  });

  observer.observe(container, { childList: true });

  function searchCharacters() {
    const query = input.value.toLowerCase().trim();

    characters.forEach(card => {
      const name = card.querySelector(".nombre").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "block" : "none";
    });
  }

  // Click en botón
  button.addEventListener("click", searchCharacters);

  // Enter
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchCharacters();
  });

  // Tiempo real
  input.addEventListener("input", searchCharacters);

})();

// ===============================
// DROPDOWN BÚSQUEDA PERSONAJES
// ===============================
(function () {

  const section = document.querySelector("#personajes");
  if (!section) return;

  const searchContainer = section.querySelector(".search-container");
  const input = searchContainer.querySelector("#character-search");
  const container = document.getElementById("lista-personajes");

  if (!input || !container) return;

  // Crear dropdown
  const searchResults = document.createElement("div");
  searchResults.classList.add("search-results");
  searchResults.style.position = "absolute";
  searchResults.style.top = "100%";
  searchResults.style.left = "0";
  searchResults.style.right = "0";
  searchResults.style.zIndex = "20";
  searchResults.style.display = "none";

  searchContainer.style.position = "relative";
  searchContainer.appendChild(searchResults);

  let characters = [];

  // Actualizar lista cuando se cargan personajes
  const observer = new MutationObserver(() => {
    characters = Array.from(container.querySelectorAll(".personaje"));
  });

  observer.observe(container, { childList: true });

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query === "") {
      searchResults.style.display = "none";
      return;
    }

    const filtered = characters.filter(card => {
      const name = card.querySelector(".nombre").textContent.toLowerCase();
      return name.includes(query);
    });

    if (filtered.length === 0) {
      searchResults.style.display = "none";
      return;
    }

    filtered.forEach(card => {
      const name = card.querySelector(".nombre").textContent;

      const option = document.createElement("div");
      option.classList.add("search-option");
      option.textContent = name;

      option.addEventListener("click", () => {
  // Rellenar input
  input.value = name;

  // Filtrar personajes
  characters.forEach(c => {
    c.style.display = c === card ? "block" : "none";
  });

  searchResults.style.display = "none";

  // 🔁 Botón para volver a todos los personajes
  const backBtn = document.createElement("button");
  backBtn.textContent = "Volver a todos los personajes";
  backBtn.style.marginTop = "50px";
  backBtn.style.padding = "10px 30px";
  backBtn.style.backgroundColor = "rgb(7, 206, 0)";
  backBtn.style.color = "#fff";
  backBtn.style.border = "none";
  backBtn.style.borderRadius = "6px";
  backBtn.style.cursor = "pointer";

  backBtn.addEventListener("click", () => {
    // Mostrar todos los personajes
    characters.forEach(c => c.style.display = "block");
    input.value = "";
    backBtn.remove();
  });

  container.parentElement.appendChild(backBtn);
});


      searchResults.appendChild(option);
    });

    searchResults.style.display = "block";
  });

  // Cerrar dropdown al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });
})();








// ===============================
// MODAL PERSONAJES (NO INTERFIERE)
// ===============================

const modalOverlay = document.getElementById("modal-overlay");
if (modalOverlay) {

  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalId = document.getElementById("modal-id");
  const modalStatus = document.getElementById("modal-status");
  const modalSpecies = document.getElementById("modal-species");
  const modalGender = document.getElementById("modal-gender");
  const modalOrigin = document.getElementById("modal-origin");
  const modalLocation = document.getElementById("modal-location");
  const modalClose = document.querySelector(".modal-close");

  // 👉 Delegación SOLO sobre personajes
  contenedor.addEventListener("click", (e) => {
    const card = e.target.closest(".personaje");
    if (!card) return;

    const id = card.dataset.id;
    if (!id) return;

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(p => {
        modalImg.src = customCharacterImages[p.name] || p.image;
        modalName.textContent = p.name;
        modalId.textContent = p.id;
        modalStatus.textContent = p.status;
        modalSpecies.textContent = p.species;
        modalGender.textContent = p.gender;
        modalOrigin.textContent = p.origin.name;
        modalLocation.textContent = p.location.name;

        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
  });

  function cerrarModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", cerrarModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) cerrarModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });
}



// EPISODIOS
const episodesContainer = document.createElement("div");
episodesContainer.id = "episodes-list";
document.querySelector("#episodes-section").appendChild(episodesContainer);

const searchInput = document.getElementById("episode-search");
const searchBtn = document.getElementById("search-btn");

let episodes = [];


// ===============================
// DESCRIPCIONES PERSONALIZADAS
// ===============================
const episodeDescriptions = {

  // -------- SEASON 1 (11) --------
  "S01E01": "Rick drags Morty into a dangerous interdimensional mission involving broken legs and bad decisions.",
  "S01E02": "A genetic experiment turns the family dog into a dangerously intelligent leader.",
  "S01E03": "Rick and Morty dive into dreams within dreams to stop a terrifying alien invasion.",
  "S01E04": "Morty falls in love during a surreal alien dating experience gone wrong.",
  "S01E05": "The family visits a theme park filled with deadly attractions and poor safety standards.",
  "S01E06": "Rick leaves clones behind to enjoy a vacation, but chaos quickly follows.",
  "S01E07": "Strange parasites infest the house, creating memories of people who never existed.",
  "S01E08": "Rick introduces the family to interdimensional television with bizarre consequences.",
  "S01E09": "Rick builds a robot to help Morty navigate teenage romance.",
  "S01E10": "A love potion experiment spirals into a horrifying global disaster.",
  "S01E11": "Morty faces the emotional aftermath of replacing his alternate self.",

  // -------- SEASON 2 (10) --------
  "S02E01": "Time fractures into multiple realities after a reckless experiment.",
  "S02E02": "Rick, Morty and Summer take on a dangerous alien scavenger hunt.",
  "S02E03": "Rick and Morty go undercover in an intergalactic criminal operation.",
  "S02E04": "Jerry experiences a terrifying visit to an alien hospital.",
  "S02E05": "A failed mission forces Rick and Morty to confront an alternate timeline.",
  "S02E06": "Rick’s past crimes catch up with him as he faces intergalactic justice.",
  "S02E07": "The family battles shape-shifting parasites that implant false memories.",
  "S02E08": "Morty attempts independence with unexpected and dark consequences.",
  "S02E09": "A romantic conflict threatens to destroy entire planets.",
  "S02E10": "Rick makes a major sacrifice to protect his family.",

  // -------- SEASON 3 (10) --------
  "S03E01": "Rick escapes prison using mind-bending psychological manipulation.",
  "S03E02": "Rick and Morty visit a post-apocalyptic Mad Max–style world.",
  "S03E03": "Rick turns himself into a pickle to avoid family therapy.",
  "S03E04": "Beth confronts childhood abandonment issues in a surreal alien world.",
  "S03E05": "Rick and Morty explore the consequences of a sentient toxic detox.",
  "S03E06": "Rick encounters a society built on extreme consumption.",
  "S03E07": "Rick clashes with the U.S. President over national security.",
  "S03E08": "Morty discovers the dangers of a wish-granting artifact.",
  "S03E09": "Rick revisits the Citadel as Morty faces a political uprising.",
  "S03E10": "Rick and Morty search for a legendary McDonald's sauce.",

  // -------- SEASON 4 (10) --------
  "S04E01": "Rick struggles with Morty’s growing independence during a crystal-powered future vision.",
  "S04E02": "Morty experiences a remote-controlled adventure with deadly consequences.",
  "S04E03": "Rick challenges a rival scientist in a battle of inventions.",
  "S04E04": "A dragon bonds with Rick, leading to uncomfortable magical chaos.",
  "S04E05": "Jerry gets entangled in a dangerous alien relationship app.",
  "S04E06": "Rick and Morty face off against story-driven reality itself.",
  "S04E07": "Morty confronts a futuristic society built on violent survival.",
  "S04E08": "A face-hugging alien creates a terrifying family crisis.",
  "S04E09": "Rick confronts the return of a powerful enemy.",
  "S04E10": "Two Beths force the family to question identity and reality.",

  // -------- SEASON 5 (10) --------
  "S05E01": "Mr. Nimbus challenges Rick while Earth faces an oceanic threat.",
  "S05E02": "Morty falls into a chaotic relationship with a dangerous alien partner.",
  "S05E03": "Rick and Morty confront a civilization built around decoys.",
  "S05E04": "Morty raises a horse-powered society with disastrous results.",
  "S05E05": "Jerry becomes the center of an intergalactic crisis.",
  "S05E06": "Rick and Morty deal with a dying man obsessed with revenge.",
  "S05E07": "The family becomes trapped in a reality built on bad ideas.",
  "S05E08": "Rick and Morty face existential dread in a digital afterlife.",
  "S05E09": "Rick confronts the consequences of his past decisions.",
  "S05E10": "The Citadel’s secrets are finally revealed."
};


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

  // ===============================
  // CARGAR EPISODIOS
  // ===============================
  async function loadEpisodes() {
    let page = 1;
    let hasNext = true;

    while (hasNext) {
      const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
      const data = await res.json();
      episodes = episodes.concat(data.results);
      hasNext = data.info.next !== null;
      page++;
    }

    episodes.forEach(ep => {
      ep.image = customImages[ep.episode]
        || generalImages[Math.floor(Math.random() * generalImages.length)];

      ep.description = episodeDescriptions[ep.episode]
        || "A chaotic adventure unfolds across the multiverse.";
    });

    renderEpisodesBySeason(episodes);
  }

  // ===============================
  // RENDERIZAR POR TEMPORADA
  // ===============================
  function renderEpisodesBySeason(list) {

    episodesContainer.innerHTML = "";

    if (list.length === 0) {
      episodesContainer.innerHTML = "<p>No episodes found.</p>";
      return;
    }

    const seasons = {};

    list.forEach(ep => {
      const seasonNum = parseInt(ep.episode.substring(1, 3));
      if (!seasons[seasonNum]) seasons[seasonNum] = [];
      seasons[seasonNum].push(ep);
    });

    Object.keys(seasons).sort().forEach(seasonNum => {

      const seasonDiv = document.createElement("div");
      seasonDiv.classList.add("season-block");

      const title = document.createElement("h3");
      title.textContent = `Season ${seasonNum}`;
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
            <p class="air-date">Air Date: ${ep.air_date}</p>
            <p class="episode-desc">${ep.description}</p>
          </div>
        `;

        marquee.appendChild(epDiv);
      });

      seasonDiv.appendChild(marquee);
      episodesContainer.appendChild(seasonDiv);
    });
  }

  // ===============================
// BÚSQUEDA DE EPISODIOS
// ===============================
const searchResults = document.createElement("div");
searchResults.id = "search-results";
searchInput.parentNode.style.position = "relative";
searchInput.parentNode.appendChild(searchResults);

// Función principal de búsqueda (Enter o botón)
function searchEpisodes() {
  const query = searchInput.value.toLowerCase();
  const filtered = episodes.filter(ep =>
    ep.name.toLowerCase().includes(query) ||
    ep.episode.toLowerCase().includes(query)
  );

  renderEpisodesBySeason(filtered);
}

searchBtn.addEventListener("click", searchEpisodes);
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchEpisodes();
});

// Búsqueda en tiempo real con dropdown ordenado cronológicamente
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";

  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  const filtered = episodes
    .filter(ep => ep.name.toLowerCase().includes(query) || ep.episode.toLowerCase().includes(query))
    .sort((a, b) => {
      const [sA, eA] = a.episode.substring(1).split("E").map(Number);
      const [sB, eB] = b.episode.substring(1).split("E").map(Number);
      return sA !== sB ? sA - sB : eA - eB;
    });

  if (filtered.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  filtered.forEach(ep => {
    const option = document.createElement("div");
    option.classList.add("search-option");
    option.textContent = `${ep.episode} - ${ep.name}`;

    option.addEventListener("click", () => {
      // Mostrar resultado exactamente como al presionar Enter
      searchInput.value = ep.name;
      searchEpisodes();

      // Limpiar dropdown
      searchResults.style.display = "none";

      // Botón para volver a todos los episodios
      const backBtn = document.createElement("button");
      backBtn.textContent = "Volver a todos los episodios";
      backBtn.style.marginTop = "20px";
      backBtn.style.padding = "10px 15px";
      backBtn.style.backgroundColor = "rgb(7, 206, 0)";
      backBtn.style.color = "#fff";
      backBtn.style.border = "none";
      backBtn.style.borderRadius = "6px";
      backBtn.style.cursor = "pointer";

      backBtn.addEventListener("click", () => {
        renderEpisodesBySeason(episodes);
      });

      episodesContainer.appendChild(backBtn);
    });

    searchResults.appendChild(option);
  });

  searchResults.style.display = "block";
});

// Ocultar dropdown al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!searchInput.parentNode.contains(e.target)) {
    searchResults.style.display = "none";
  }
});

  // ===============================
  // INICIAR
  // ===============================
  loadEpisodes();




















