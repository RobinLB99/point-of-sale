export interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: "admin" | "cashier" | "manager";
  status: "active" | "inactive";
  createdAt: Date;
  lastLogin?: Date;
}
