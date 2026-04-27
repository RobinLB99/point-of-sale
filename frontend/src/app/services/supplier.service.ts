import { Injectable, signal, computed } from "@angular/core";
import { Supplier } from "../models/supplier.model";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  private suppliersSignal = signal<Supplier[]>([
    {
      id: "1",
      empresa: "Coca-Cola",
      vendedor: "Juan Pérez - Preventista",
      telefono: "0987654321",
      diaVisita: "Jueves",
      activo: true,
    },
    {
      id: "2",
      empresa: "Bimbo",
      vendedor: "Marcos Rivas",
      telefono: "0912345678",
      diaVisita: "Martes",
      activo: true,
    },
    {
      id: "3",
      empresa: "Pronaca",
      vendedor: "Elena Gómez",
      telefono: "0999888777",
      diaVisita: "Lunes",
      activo: true,
    },
    {
      id: "4",
      empresa: "La Fabril",
      vendedor: "Carlos Holguín",
      telefono: "0955444333",
      diaVisita: "Jueves",
      activo: true,
    },
    {
      id: "5",
      empresa: "Tesalia",
      vendedor: "Roberto Mera",
      telefono: "0933222111",
      diaVisita: "Viernes",
      activo: false,
    },
  ]);

  public suppliers = this.suppliersSignal.asReadonly();

  // KPIs
  public totalSuppliers = computed(() => this.suppliers().length);
  public activeSuppliers = computed(
    () => this.suppliers().filter((s) => s.activo).length,
  );

  public visitsTodayCount = computed(() => {
    const today = this.getTodaySpanish();
    return this.suppliers().filter((s) => s.diaVisita === today && s.activo)
      .length;
  });

  private getTodaySpanish(): string {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return days[new Date().getDay()];
  }

  addSupplier(supplier: Omit<Supplier, "id">) {
    const newSupplier = {
      ...supplier,
      id: Math.random().toString(36).substring(2, 9),
    };
    this.suppliersSignal.update((s) => [...s, newSupplier]);
  }

  updateSupplier(id: string, updates: Partial<Supplier>) {
    this.suppliersSignal.update((s) =>
      s.map((sup) => (sup.id === id ? { ...sup, ...updates } : sup)),
    );
  }

  deleteSupplier(id: string) {
    this.suppliersSignal.update((s) => s.filter((sup) => sup.id !== id));
  }
}
