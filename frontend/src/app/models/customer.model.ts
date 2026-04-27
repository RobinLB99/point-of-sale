export interface Customer {
  id: string;
  name: string;
  phone: string;
  cedula?: string;
  creditLimit: number;
  currentDebt: number;
  status: "al-dia" | "con-deuda" | "bloqueado";
}

export type CustomerStatus = "al-dia" | "con-deuda" | "bloqueado";
