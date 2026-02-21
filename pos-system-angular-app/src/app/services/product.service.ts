import { Injectable, signal, computed } from "@angular/core";
import { Product, getProductStatus } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private _products = signal<Product[]>([
    {
      id: "1",
      nombre: "Coca Cola 600ml",
      categoria: "Bebidas",
      precioCosto: 12.5,
      precioVenta: 18.0,
      stock: 45,
      stockMinimo: 10,
    },
    {
      id: "2",
      nombre: "Papas Sabritas Original 45g",
      categoria: "Snacks",
      precioCosto: 9.0,
      precioVenta: 15.0,
      stock: 8,
      stockMinimo: 15,
    },
    {
      id: "3",
      nombre: "Leche Entera 1L",
      categoria: "Lácteos",
      precioCosto: 20.0,
      precioVenta: 26.5,
      stock: 0,
      stockMinimo: 5,
    },
    {
      id: "4",
      nombre: "Pan Blanco Grande",
      categoria: "Panadería",
      precioCosto: 35.0,
      precioVenta: 48.0,
      stock: 20,
      stockMinimo: 5,
    },
    {
      id: "5",
      nombre: "Agua Purificada 1.5L",
      categoria: "Bebidas",
      precioCosto: 8.0,
      precioVenta: 14.0,
      stock: 100,
      stockMinimo: 20,
    },
  ]);

  products = this._products.asReadonly();

  totalProducts = computed(() => this._products().length);

  stockAlerts = computed(
    () => this._products().filter((p) => p.stock <= p.stockMinimo).length,
  );

  inventoryValue = computed(() =>
    this._products().reduce((acc, p) => acc + p.precioCosto * p.stock, 0),
  );

  mainCategory = computed(() => {
    const counts = this._products().reduce(
      (acc, p) => {
        acc[p.categoria] = (acc[p.categoria] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  });

  addProduct(product: Omit<Product, "id">) {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 9),
    };
    this._products.update((prev) => [...prev, newProduct]);
  }

  updateProduct(id: string, updates: Partial<Product>) {
    this._products.update((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  }

  restockProduct(id: string, quantity: number, newCostPrice: number) {
    this._products.update((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: p.stock + quantity, precioCosto: newCostPrice }
          : p,
      ),
    );
  }

  deleteProduct(id: string) {
    this._products.update((prev) => prev.filter((p) => p.id !== id));
  }
}
