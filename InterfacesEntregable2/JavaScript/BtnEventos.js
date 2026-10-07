document.addEventListener('DOMContentLoaded', function () {
 
  // Seleccionamos el botón y el menú
  const btnPerfil = document.querySelector('.btn-perfil');
  const menuPerfil = document.querySelector('.menu-perfil');

  // Evento para abrir/cerrar el menú al hacer clic en el botón
  btnPerfil.addEventListener('click', function(evento) {
    // toggle() agrega la clase 'activo' si no la tiene, y la quita si ya la tiene
    menuPerfil.classList.toggle('activo');
    
    // Esto evita que el clic en el botón active el evento de "cerrar haciendo clic afuera"
    evento.stopPropagation(); 
  });

  // Evento para cerrar el menú si se hace clic en cualquier otra parte de la pantalla
  document.addEventListener('click', function(evento) {
    if (menuPerfil && btnPerfil){
    // Si el menú está activo Y el clic no fue dentro del menú ni en el botón
    if (!menuPerfil.contains(evento.target) && !btnPerfil.contains(evento.target)) {
      menuPerfil.classList.remove('activo');
     }
    }
  });
  

  const burgerBtn = document.querySelector('.btn-burger');
  const menu = document.querySelector('.menu-hamburguesa');
  const menuItems = document.querySelectorAll('.menu-item');

  
  if (!burgerBtn || !menu) return;

  // Crea el overlay dinámicamente (no hace falta tocar el HTML)
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  // ---------- Abrir / cerrar menú ----------
  function toggleMenu() {
    burgerBtn.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  burgerBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // ---------- Marcar la opción activa al clickear y navegar ----------
  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      menuItems.forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');

      // Cierra el menú luego de navegar
      if (menu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ---------- Marcar automáticamente la sección visible al scrollear ----------
  const sections = document.querySelectorAll('section[id]');

  if (sections.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          menuItems.forEach(function (item) {
            item.classList.toggle('active', item.dataset.section === id);
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }


  
});

//btn-banner-jugar
const btn_banner_jugar = document.getElementById('btnJugar');
let navegando = false;

// Saltito periódico: solo alterna una clase, el movimiento lo hace la transition
const salto = setInterval(() => {
  if (navegando || btn_banner_jugar.matches(':hover')) return;
  btn_banner_jugar.classList.add('salto');
  setTimeout(() => btn_banner_jugar.classList.remove('salto'), 250);
}, 2500);

// Al tocar: se desvanece y navega
btn_banner_jugar.addEventListener('click', () => {
  if (navegando) return;
  navegando = true;
  clearInterval(salto);
  btn_banner_jugar.classList.add('saliendo');
  setTimeout(() => {
    window.location.href = '../InterfacesEntregable2/juego.html';
  }, 350);
});

const botonPremium = document.querySelector(".btn-subscription");
const listaJuegos = document.getElementById("lista-juegos");

// Datos de los juegos: agregá, quitá o editá objetos acá
const juegos = [
  { id: 1, nombre: "Juego 1", imagen: "Img/jugeoLista1.png" },
  { id: 2, nombre: "Juego 2", imagen: "Img/juegosLista2.png" },
  { id: 3, nombre: "Juego 3", imagen: "Img/juegoLista3.png" },
  { id: 4, nombre: "Juego 4", imagen: "Img/jugeoLista4.png" },
  { id: 5, nombre: "Juego 5", imagen: "Img/juegoLista.png" },
];

// Crea una tarjeta de juego
function crearTarjeta(juego) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "juego";

    const imagen = document.createElement("img");
    imagen.className = "juego__imagen";
    imagen.src = juego.imagen;
    imagen.alt = juego.nombre;

    const boton = document.createElement("div");
    boton.className = "boton-jugar";
    boton.innerHTML = '<div class="boton-jugar__texto">Jugar</div>';

    tarjeta.append(imagen, boton);
    return tarjeta;
}

// Click en el botón: genera la lista si no existe, o la borra si ya está
botonPremium.addEventListener("click", (evento) => {
    evento.preventDefault(); // evita que el href="" recargue la página
    if (listaJuegos.children.length > 0) {
        listaJuegos.replaceChildren();
    } else {
        listaJuegos.append(...juegos.map(crearTarjeta));
    }
});

//flechas

const container = document.querySelector('.banner-container');
const slides = document.querySelectorAll('.banner-slide');
const prev = document.querySelector('.banner-arrow.prev');
const next = document.querySelector('.banner-arrow.next');

let index = 0;

function goTo(i) {
    index = (i + slides.length) % slides.length;    // da la vuelta al llegar al final
    container.style.setProperty('--i', index);

}

next.addEventListener('click', () => goTo(index + 1));
prev.addEventListener('click', () => goTo(index - 1));

goTo(0);


document.addEventListener('DOMContentLoaded', async function () {
    // Constantes para transicion
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.querySelector('.loading-text');
    const progress = document.querySelector('.progress');
    const progressNumber = document.querySelector('.persent');

    overlay.hidden = false;

    let dots = '';
    let progressWidth = 0;


    await new Promise((resolve) => {

      const textInterval = setInterval(() => {
        dots = dots.length < 3 ? dots + '.' : '';
        loadingText.innerHTML = 'Preparando la diversion' + dots;
      }, 500);

      const progressInterval = setInterval(() => {
        progressWidth += 2;
        progress.style.width = progressWidth + '%';
        progressNumber.textContent = progressWidth + '%';

        if (progressWidth >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          loadingText.textContent = '¡Disfruta tu experiencia!';
          setTimeout(() => overlay.classList.add('is-leaving'), 800);
          resolve(); // recién acá se resuelve la promesa
        }
      }, 50);
    });

  })