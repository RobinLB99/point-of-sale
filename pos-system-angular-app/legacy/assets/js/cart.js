// 1. ESTADO
let carrito = [];

// 2. FUNCIÓN DE AGREGAR (Desde el Grid de Productos)
function agregarDesdeDOM(elementoBtn) {
  const id = elementoBtn.dataset.id;
  const stockMaximo = parseInt(elementoBtn.dataset.stock || 0); // Leemos el stock

  // Buscar si ya existe en el carrito
  const itemExistente = carrito.find((item) => item.id === id);
  const cantidadActual = itemExistente ? itemExistente.cantidad : 0;

  // 1. VALIDACIÓN DE STOCK
  if (cantidadActual >= stockMaximo) {
    alert("¡Stock insuficiente! No quedan más unidades.");
    return; // Detiene la función, no agrega nada
  }

  // Lógica normal de agregar...
  const nombre = elementoBtn.dataset.nombre;
  const precio = parseFloat(elementoBtn.dataset.precio);
  const img = elementoBtn.dataset.img || "ph-package";

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      img,
      cantidad: 1,
      maxStock: stockMaximo, // Guardamos el stock en el item del carrito también
    });
  }

  // Efecto visual
  elementoBtn.classList.add("scale-95", "border-soft-linen-500");
  setTimeout(
    () => elementoBtn.classList.remove("scale-95", "border-soft-linen-500"),
    150,
  );

  actualizarUI();
}

// 3. CAMBIAR CANTIDAD
function cambiarCantidad(id, cambio) {
  const idStr = String(id);
  const item = carrito.find((i) => i.id === idStr);

  if (!item) return;

  // VALIDACIÓN AL SUMAR
  if (cambio > 0 && item.cantidad >= item.maxStock) {
    alert("No puedes agregar más, stock al límite.");
    return;
  }

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter((i) => i.id !== idStr);
  }
  actualizarUI();
}

function limpiarCarrito() {
  if (confirm("¿Vaciar todo el carrito?")) {
    carrito = [];
    actualizarUI();
  }
}

// 4. ACTUALIZAR INTERFAZ
// 4. ACTUALIZAR INTERFAZ (COMPLETA)
function actualizarUI() {
  // A. CÁLCULOS
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  const total = subtotal.toFixed(2);
  const itemsTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // B. GENERAR HTML (Sin animación fade-in)
  const html = carrito
    .map(
      (item) => `
    <div class="flex gap-3 group mb-3">
      <div class="w-10 h-10 bg-grey-olive-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <i class="ph ${item.img} text-grey-olive-400"></i>
      </div>
      <div class="flex-1">
        <div class="flex justify-between items-start mb-1">
          <h5 class="text-sm font-semibold text-pale-slate-800 leading-tight line-clamp-2">${item.nombre}</h5>
          <span class="font-bold text-sm text-pale-slate-900">$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-xs text-grey-olive-500">$${item.precio} u</p>
          <div class="flex items-center bg-white rounded-md border border-grey-olive-200 shadow-sm h-6">
            <button onclick="cambiarCantidad('${item.id}', -1)" class="px-2 h-full flex items-center text-pale-slate-400 hover:text-red-500 rounded-l-md"><i class="ph-bold ph-minus text-[10px]"></i></button>
            <span class="text-xs font-semibold px-1 min-w-[1.5rem] text-center text-pale-slate-700">${item.cantidad}</span>
            <button onclick="cambiarCantidad('${item.id}', 1)" class="px-2 h-full flex items-center text-pale-slate-400 hover:text-green-600 rounded-r-md"><i class="ph-bold ph-plus text-[10px]"></i></button>
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  // C. INYECTAR EN EL HTML
  const desktopList = document.getElementById("lista-carrito-desktop");
  const mobileList = document.getElementById("lista-carrito-mobile");

  if (desktopList) desktopList.innerHTML = html;
  if (mobileList) mobileList.innerHTML = html;

  // D. ACTUALIZAR ETIQUETAS DE PRECIO
  document
    .querySelectorAll(".lbl-total")
    .forEach((el) => (el.innerText = `$${total}`));
  document
    .querySelectorAll(".lbl-subtotal")
    .forEach((el) => (el.innerText = `$${total}`));
  document
    .querySelectorAll(".lbl-cantidad-items")
    .forEach((el) => (el.innerText = itemsTotal));

  // E. ACTUALIZAR STOCK VISUAL (Bloquear tarjetas)
  actualizarEstadoTarjetas();
}

// [NUEVA FUNCIÓN] Controla la opacidad y clics de las tarjetas
// [CORREGIDO] Controla la opacidad y EL NÚMERO DE STOCK RESTANTE
function actualizarEstadoTarjetas() {
  const tarjetas = document.querySelectorAll(".producto-card");

  tarjetas.forEach((btn) => {
    const id = btn.dataset.id;
    const stockTotal = parseInt(btn.dataset.stock || 0); // El stock máximo original

    // 1. Calcular cuántos tengo ya en el carrito
    const itemEnCarrito = carrito.find((i) => i.id === id);
    const cantidadEnUso = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    // 2. Calcular el stock real restante
    const stockRestante = stockTotal - cantidadEnUso;

    const badge = btn.querySelector("div.absolute"); // El badge visual

    // CASO A: Se acabó el stock (Restante es 0 o menos)
    if (stockRestante <= 0) {
      btn.classList.add(
        "opacity-50",
        "cursor-not-allowed",
        "pointer-events-none",
        "grayscale",
      );

      if (badge) {
        badge.innerText = "Agotado";
        badge.classList.remove("bg-grey-olive-100", "text-grey-olive-600");
        badge.classList.add("bg-red-100", "text-red-600");
      }
    }
    // CASO B: Aún hay stock
    else {
      // Reactivamos la tarjeta
      btn.classList.remove(
        "opacity-50",
        "cursor-not-allowed",
        "pointer-events-none",
        "grayscale",
      );

      if (badge) {
        // AQUÍ ESTABA EL ERROR: Ahora mostramos la resta
        badge.innerText = `Stock: ${stockRestante}`;

        // Volvemos al color original
        badge.classList.remove("bg-red-100", "text-red-600");
        badge.classList.add("bg-grey-olive-100", "text-grey-olive-600");
      }
    }
  });
}

// 5. ENVÍO A SPRING BOOT
function procesarVenta() {
  if (carrito.length === 0) return alert("El carrito está vacío");

  const dataVenta = {
    items: carrito.map((i) => ({
      productoId: i.id,
      cantidad: i.cantidad,
    })),
  };

  console.log("Enviando venta:", dataVenta);

  // Descomentar para producción:
  /*
    fetch("/ventas/guardar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataVenta),
    })
    .then(res => res.json())
    .then(data => { if(data.urlRedireccion) window.location.href = data.urlRedireccion; })
    .catch(err => console.error(err));
    */
  alert("Simulación: Venta enviada (ver consola)");
}

// 6. FILTRO LOCAL
function filtrarProductosLocal(texto) {
  const term = texto.toLowerCase();
  document.querySelectorAll(".producto-card").forEach((card) => {
    const nombre = card.dataset.nombre.toLowerCase();
    card.classList.toggle("hidden", !nombre.includes(term));
  });
}

function toggleCart() {
  const panel = document.getElementById("cart-panel");
  const ov = document.getElementById("cart-overlay");
  const closed = panel.classList.contains("translate-y-full");

  panel.classList.toggle("translate-y-full", !closed);
  if (closed) {
    ov.classList.remove("hidden");
    setTimeout(() => ov.classList.remove("opacity-0"), 10);
  } else {
    ov.classList.add("opacity-0");
    setTimeout(() => ov.classList.add("hidden"), 300);
  }
}

// Ejecutar al cargar la página para bloquear items sin stock inicial
document.addEventListener("DOMContentLoaded", () => {
  actualizarEstadoTarjetas();
});
