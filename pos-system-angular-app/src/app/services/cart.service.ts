import { Injectable, computed, signal } from "@angular/core";

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  img: string;
  cantidad: number;
  maxStock: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private _items = signal<CartItem[]>([]);

  items = this._items.asReadonly();

  subtotal = computed(() =>
    this._items().reduce((acc, item) => acc + item.precio * item.cantidad, 0),
  );

  total = computed(() => this.subtotal());

  itemsCount = computed(() =>
    this._items().reduce((acc, item) => acc + item.cantidad, 0),
  );

  addToCart(product: Omit<CartItem, "cantidad">) {
    const existingItem = this._items().find((item) => item.id === product.id);
    const currentQty = existingItem ? existingItem.cantidad : 0;

    if (currentQty >= product.maxStock) {
      // En una app real usaríamos un ToastService, por ahora mantenemos el alert del legacy para consistencia
      alert("¡Stock insuficiente! No quedan más unidades.");
      return;
    }

    if (existingItem) {
      this._items.update((items) =>
        items.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      );
    } else {
      this._items.update((items) => [...items, { ...product, cantidad: 1 }]);
    }
  }

  updateQuantity(id: string, delta: number) {
    const item = this._items().find((i) => i.id === id);
    if (!item) return;

    if (delta > 0 && item.cantidad >= item.maxStock) {
      alert("No puedes agregar más, stock al límite.");
      return;
    }

    this._items.update((items) => {
      const updatedItems = items
        .map((i) => {
          if (i.id === id) {
            const newQty = i.cantidad + delta;
            return newQty > 0 ? { ...i, cantidad: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null);

      return updatedItems;
    });
  }

  clearCart() {
    this._items.set([]);
  }

  // Helper para verificar stock disponible de un producto específico
  getStockRemaining(productId: string, maxStock: number): number {
    const item = this._items().find((i) => i.id === productId);
    return maxStock - (item ? item.cantidad : 0);
  }
}
