import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

interface Movement {
  time: string;
  type: "SALIDA" | "ENTRADA" | "INICIO";
  description: string;
  amount: number;
  user: string;
}

interface CashStatus {
  openedAt: string;
  initialBalance: number;
  cashSales: number;
  expenses: number;
  expectedTotal: number;
}

@Injectable({
  providedIn: "root",
})
export class CashControlService {
  readonly isCashOpen = signal(false);
  cashStatus = signal<CashStatus>({
    openedAt: "",
    initialBalance: 0.0,
    cashSales: 0.0,
    expenses: 0.0,
    expectedTotal: 0.0,
  });
  movements = signal<Movement[]>([]);

  constructor(private router: Router) {}

  openCashRegister(initialBalance: number, description: string) {
    const openedAt = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    this.cashStatus.set({
      openedAt: openedAt,
      initialBalance: initialBalance,
      cashSales: 0.0,
      expenses: 0.0,
      expectedTotal: initialBalance,
    });
    this.movements.set([
      {
        time: openedAt,
        type: "INICIO",
        description:
          "Apertura de caja" + (description ? `: ${description}` : ""),
        amount: initialBalance,
        user: "Admin", // TODO: Obtener usuario actual
      },
    ]);
    this.isCashOpen.set(true);
    console.log("Caja abierta:", this.cashStatus());
  }

  closeCashRegister() {
    this.isCashOpen.set(false);
    this.cashStatus.set({
      openedAt: "",
      initialBalance: 0,
      cashSales: 0,
      expenses: 0,
      expectedTotal: 0,
    });
    this.movements.set([]);
    console.log("Caja cerrada.");
    this.router.navigate(["/open-cash"]); // Redirigir a la página de abrir caja
  }

  registerExpense(amount: number, description: string) {
    if (!this.isCashOpen()) return;
    this.cashStatus.update((currentStatus) => ({
      ...currentStatus,
      expenses: currentStatus.expenses + amount,
      expectedTotal: currentStatus.expectedTotal - amount,
    }));
    this.movements.update((currentMovements) => [
      {
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "SALIDA",
        description: description,
        amount: -amount,
        user: "Admin",
      },
      ...currentMovements,
    ]);
  }

  registerIncome(amount: number, description: string) {
    if (!this.isCashOpen()) return;
    this.cashStatus.update((currentStatus) => ({
      ...currentStatus,
      expectedTotal: currentStatus.expectedTotal + amount,
    }));
    this.movements.update((currentMovements) => [
      {
        time: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "ENTRADA",
        description: description,
        amount: amount,
        user: "Admin",
      },
      ...currentMovements,
    ]);
  }
}
