/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * MOBILE NAVBAR TOGGLER
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

// Agregar event listener para cerrar navbar al hacer clic fuera de ella
document.addEventListener('click', (event) => {
  const isClickInsideNavbar = navbar.contains(event.target);

  if (!isClickInsideNavbar && navbar.classList.contains('active')) {
    toggleNav(); // Cierra la navbar si está activa y se hace clic fuera de ella
  }
});

addEventOnElements(navTogglers, "click", (event) => {
  event.stopPropagation(); // Evitar que el clic en el botón propague al documento y cierre inmediatamente
  toggleNav();
});

/**
 * HEADER ANIMATION
 * When scrolled down to 100px header will be active
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * SLIDER
 */
const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */
const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */
const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

// Función para mostrar la ventana emergente solo una vez a los primeros usuarios
function showPopupOnce() {
  const popupShown = localStorage.getItem("popupShown");

  if (!popupShown) {
    showPopup();
    localStorage.setItem("popupShown", "true");
  }
}

// Llama a la función para mostrar el popup solo una vez
showPopupOnce();

// Función para mostrar la ventana emergente
function showPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("overlay").style.opacity = 1;
  document.getElementById("popup-container").style.display = "block";
  document.getElementById("popup-container").style.bottom = "20%";
  setTimeout(function () {
    document.getElementById("popup-container").style.opacity = 1;
  }, 50); // Espera un breve momento antes de aplicar la opacidad para asegurar la transición suave
}

// Función para cerrar la ventana emergente
function closePopup() {
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("popup-container").style.bottom = "-100%";
  document.getElementById("popup-container").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup-container").style.display = "none";
  }, 800); // Espera a que termine la animación antes de ocultar completamente
}
