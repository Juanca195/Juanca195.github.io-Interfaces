
const form = document.getElementById("form");       
const btn = document.getElementById("btn-login");         
const texto = document.getElementById("texto");     
const spinner = document.getElementById("spinner"); 
const overlay = document.getElementById("loading-overlay");
const loadingText = document.querySelector(".loading-text");
const progress = document.querySelector(".progress");
const progressNumber = document.querySelector(".persent");

let girando = false; // interruptor: true = el spinner gira, false = se detiene
let angulo = 0;      // grados que lleva girado

function girar() {
  if (!girando) return;                            // si no debe girar, corta el ciclo
  angulo = (angulo + 6) % 360;                     // suma 6 grados (vuelve a 0 al llegar a 360)
  spinner.style.transform = "rotate(" + angulo + "deg)"; // aplica la rotación
  requestAnimationFrame(girar);                    // se vuelve a llamar en el siguiente cuadro
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.classList.add("loading");
  texto.textContent = "Logueando...";
  girando = true;
  girar();

  await new Promise(r => setTimeout(r, 1500));

  girando = false;
  btn.classList.remove("loading");
  btn.classList.add("done");
  texto.textContent = "✓ ¡Logueado!";

  btn.classList.add("pop");
  setTimeout(() => btn.classList.remove("pop"), 200);

  await new Promise(r => setTimeout(r, 500));
  overlay.hidden = false;

  let dots = "";
  let progressWidth = 0;
  await new Promise((resolve) => {
    const textInterval = setInterval(() => {
      dots = dots.length < 3 ? dots + "." : "";
      loadingText.textContent = "Preparando la diversión" + dots;
    }, 500);

    const progressInterval = setInterval(() => {
      progressWidth += 2;
      progress.style.width = progressWidth + "%";
      progressNumber.textContent = progressWidth + "%";

      if (progressWidth >= 100) {
        clearInterval(progressInterval);
        clearInterval(textInterval);
        loadingText.textContent = "¡Disfruta tu experiencia!";
        overlay.style.animation = "exit 500ms ease-out forwards";
        resolve();
      }
    }, 50);
  });

  await new Promise(r => setTimeout(r, 500));
  window.location.href = "inicio.html";
});