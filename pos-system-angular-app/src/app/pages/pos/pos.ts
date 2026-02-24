import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { UIService } from "../../services/ui.service";
import { CartService } from "../../services/cart.service";
import { CashControlService } from "../../services/cash-control.service";

// Componentes del POS
import { DesktopCartComponent } from "./components/desktop-cart/desktop-cart";
import { MobileCartComponent } from "./components/mobile-cart/mobile-cart";
import { PosActionBarComponent } from "./components/pos-action-bar/pos-action-bar";
import { ProductGridComponent } from "./components/product-grid/product-grid";
import { CashStatusBannerComponent } from "./components/cash-status-banner/cash-status-banner";

interface Product {
  id: string;
  nombre: string;
  precio: number;
  img: string;
  stock: number;
  categoria: string;
}

@Component({
  selector: "app-pos",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DesktopCartComponent,
    MobileCartComponent,
    PosActionBarComponent,
    ProductGridComponent,
    CashStatusBannerComponent,
  ],
  templateUrl: "./pos.html",
  styleUrl: "./pos.css",
})
export class PosComponent {
  router = inject(Router);
  uiService = inject(UIService);
  cartService = inject(CartService);
  cashControlService = inject(CashControlService);

  isCashOpen = this.cashControlService.isCashOpen;

  // Estado local para búsqueda y filtrado
  searchQuery = signal("");
  selectedCategory = signal("all");
  isCartMobileOpen = signal(false);

  // Datos (En el futuro vendrán de un servicio/API)
  products = signal<Product[]>([
    {
      id: "101",
      nombre: "Coca Cola 1.5L Original",
      precio: 1.5,
      img: "ph-drop",
      stock: 5,
      categoria: "Bebidas",
    },
    {
      id: "102",
      nombre: "Galletas Oreo",
      precio: 0.75,
      img: "ph-cookie",
      stock: 12,
      categoria: "Snacks",
    },
    {
      id: "103",
      nombre: "Galletas Salticas",
      precio: 0.5,
      img: "ph-cookie",
      stock: 20,
      categoria: "Snacks",
    },
    {
      id: "104",
      nombre: "Agua Mineral 500ml",
      precio: 0.8,
      img: "ph-drop",
      stock: 30,
      categoria: "Bebidas",
    },
    {
      id: "105",
      nombre: "Papas Fritas Natural",
      precio: 1.2,
      img: "ph-cookie",
      stock: 8,
      categoria: "Snacks",
    },
    {
      id: "106",
      nombre: "Jugo de Naranja 1L",
      precio: 2.1,
      img: "ph-drop",
      stock: 5,
      categoria: "Bebidas",
    },
  ]);

  categories = computed(() => {
    const cats = this.products().map((p) => p.categoria);
    return ["all", ...new Set(cats)];
  });

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();

    return this.products().filter((p) => {
      const matchesQuery = p.nombre.toLowerCase().includes(query);
      const matchesCat = cat === "all" || p.categoria === cat;
      return matchesQuery && matchesCat;
    });
  });

  // UI Actions
  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  toggleCartMobile() {
    this.isCartMobileOpen.update((v) => !v);
  }

  addToCart(p: Product) {
    this.cartService.addToCart({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      img: p.img,
      maxStock: p.stock,
    });
  }

  clearCart() {
    if (confirm("¿Vaciar todo el carrito?")) {
      this.cartService.clearCart();
    }
  }

  procesarVenta() {
    if (!this.isCashOpen()) {
      alert("La caja debe estar abierta para procesar ventas.");
      return;
    }
    if (this.cartService.itemsCount() === 0) {
      alert("El carrito está vacío");
      return;
    }
    console.log("Procesando venta:", this.cartService.items());
    alert("Simulación: Venta procesada con éxito");
    this.cartService.clearCart();
  }
}
