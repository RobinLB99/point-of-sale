import { Injectable, signal, computed, inject } from "@angular/core";
import { CashControlService } from "./cash-control.service";

export interface Debtor {
  id: number;
  name: string;
  phone: string;
  creditLimit: number;
  currentDebt: number;
  status: "active" | "at-limit" | "blocked";
}

export interface CreditMovement {
  id: number;
  debtorId: number;
  date: string;
  type: "ABONO" | "VENTA";
  amount: number;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class CreditService {
  private cashControlService = inject(CashControlService);

  private _debtors = signal<Debtor[]>([
    {
      id: 1,
      name: "Don Pepe (Esquina)",
      phone: "123-4567",
      creditLimit: 50.0,
      currentDebt: 15.0,
      status: "active",
    },
    {
      id: 2,
      name: "Doña María",
      phone: "234-5678",
      creditLimit: 20.0,
      currentDebt: 18.5,
      status: "at-limit",
    },
    {
      id: 3,
      name: "Carlos Ruíz",
      phone: "345-6789",
      creditLimit: 100.0,
      currentDebt: 100.0,
      status: "blocked",
    },
    {
      id: 4,
      name: "Ana López",
      phone: "456-7890",
      creditLimit: 30.0,
      currentDebt: 5.0,
      status: "active",
    },
    {
      id: 5,
      name: "Juan Pérez",
      phone: "567-8901",
      creditLimit: 40.0,
      currentDebt: 10.0,
      status: "active",
    },
    {
      id: 6,
      name: "Marta Gómez",
      phone: "678-9012",
      creditLimit: 60.0,
      currentDebt: 45.0,
      status: "at-limit",
    },
    {
      id: 7,
      name: "Pedro Picapiedra",
      phone: "789-0123",
      creditLimit: 25.0,
      currentDebt: 0.0,
      status: "active",
    },
    {
      id: 8,
      name: "Luisa Lane",
      phone: "890-1234",
      creditLimit: 80.0,
      currentDebt: 75.0,
      status: "at-limit",
    },
    {
      id: 9,
      name: "Roberto Bolaños",
      phone: "901-2345",
      creditLimit: 50.0,
      currentDebt: 50.0,
      status: "blocked",
    },
    {
      id: 10,
      name: "Elena Nito",
      phone: "012-3456",
      creditLimit: 15.0,
      currentDebt: 2.5,
      status: "active",
    },
    {
      id: 11,
      name: "Zoyla Vaca",
      phone: "123-4444",
      creditLimit: 100.0,
      currentDebt: 0.0,
      status: "active",
    },
    {
      id: 12,
      name: "Armando Casas",
      phone: "555-6666",
      creditLimit: 200.0,
      currentDebt: 150.0,
      status: "at-limit",
    },
  ]);

  private _movements = signal<CreditMovement[]>([
    {
      id: 1,
      debtorId: 1,
      date: "Hoy",
      type: "ABONO",
      amount: 5.0,
      description: "Abono en efectivo",
    },
    {
      id: 2,
      debtorId: 1,
      date: "Ayer",
      type: "VENTA",
      amount: 12.5,
      description: "Venta Ticket #0045",
    },
    {
      id: 3,
      debtorId: 1,
      date: "Lunes",
      type: "VENTA",
      amount: 7.5,
      description: "Venta Ticket #0012",
    },
  ]);

  debtors = computed(() => this._debtors());

  totalFiado = computed(() =>
    this._debtors().reduce((acc, d) => acc + d.currentDebt, 0),
  );

  debtorCount = computed(
    () => this._debtors().filter((d) => d.currentDebt > 0).length,
  );

  atLimitCount = computed(
    () =>
      this._debtors().filter(
        (d) => d.status === "at-limit" || d.status === "blocked",
      ).length,
  );

  getMovementsByDebtor(debtorId: number) {
    return this._movements().filter((m) => m.debtorId === debtorId);
  }

  addAbono(debtorId: number, amount: number) {
    const debtor = this._debtors().find((d) => d.id === debtorId);
    if (!debtor) return;

    this._debtors.update((debtors) =>
      debtors.map((d) => {
        if (d.id === debtorId) {
          const newDebt = d.currentDebt - amount;
          return {
            ...d,
            currentDebt: newDebt,
            status:
              newDebt >= d.creditLimit
                ? "blocked"
                : newDebt >= d.creditLimit * 0.8
                  ? "at-limit"
                  : "active",
          };
        }
        return d;
      }),
    );

    this._movements.update((movements) => [
      {
        id: Date.now(),
        debtorId,
        date: "Hoy",
        type: "ABONO",
        amount,
        description: "Abono en efectivo",
      },
      ...movements,
    ]);

    // Registrar ingreso en caja automáticamente
    this.cashControlService.registerIncome(
      amount,
      `Abono de cliente: ${debtor.name}`,
    );
  }
}
