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

// Modelo específico para la respuesta de la API de Auth
export interface AuthUser {
  id: number;
  username: string;
  name: string;
  roles: string[];
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
