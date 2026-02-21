import { Injectable, signal, computed } from "@angular/core";
import { Customer, CustomerStatus } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private customersSignal = signal<Customer[]>([
    {
      id: "1",
      name: "María Esquina",
      phone: "0987654321",
      creditLimit: 30,
      currentDebt: 15.5,
      status: "con-deuda",
    },
    {
      id: "2",
      name: "Don Pepe",
      phone: "0912345678",
      creditLimit: 50,
      currentDebt: 0,
      status: "al-dia",
    },
    {
      id: "3",
      name: "Vecino Carlos",
      phone: "0999888777",
      creditLimit: 20,
      currentDebt: 20,
      status: "bloqueado",
    },
    {
      id: "4",
      name: "Doña Rosa",
      phone: "0955444333",
      creditLimit: 40,
      currentDebt: 5,
      status: "con-deuda",
    },
    {
      id: "5",
      name: "Luis Tienda",
      phone: "0933222111",
      creditLimit: 100,
      currentDebt: 0,
      status: "al-dia",
    },
  ]);

  public customers = this.customersSignal.asReadonly();

  // KPIs
  public totalCustomers = computed(() => this.customers().length);
  public customersWithDebtCount = computed(
    () => this.customers().filter((c) => c.currentDebt > 0).length,
  );
  public customersAtLimitCount = computed(
    () =>
      this.customers().filter(
        (c) => c.status === "bloqueado" || c.currentDebt >= c.creditLimit,
      ).length,
  );

  addCustomer(customer: Omit<Customer, "id" | "status">) {
    const status = this.calculateStatus(
      customer.currentDebt,
      customer.creditLimit,
    );
    const newCustomer = {
      ...customer,
      id: Math.random().toString(36).substring(2, 9),
      status,
    };
    this.customersSignal.update((c) => [...c, newCustomer]);
  }

  updateCustomer(id: string, updates: Partial<Customer>) {
    this.customersSignal.update((list) =>
      list.map((c) => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          updated.status = this.calculateStatus(
            updated.currentDebt,
            updated.creditLimit,
          );
          return updated;
        }
        return c;
      }),
    );
  }

  deleteCustomer(id: string) {
    this.customersSignal.update((c) => c.filter((cust) => cust.id !== id));
  }

  private calculateStatus(debt: number, limit: number): CustomerStatus {
    if (debt <= 0) return "al-dia";
    if (debt >= limit) return "bloqueado";
    return "con-deuda";
  }
}
