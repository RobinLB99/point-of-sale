const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("mobile-overlay");

function toggleSidebar() {
  // Alternar clases para mostrar/ocultar
  if (sidebar.classList.contains("-translate-x-full")) {
    // Abrir
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    setTimeout(() => overlay.classList.remove("opacity-0"), 10); // Pequeño delay para la transición
  } else {
    // Cerrar
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("opacity-0");
    setTimeout(() => overlay.classList.add("hidden"), 300); // Esperar a que termine la transición
  }
}
