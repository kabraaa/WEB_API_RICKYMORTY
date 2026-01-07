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