import { Injectable, signal, computed } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersState = signal<User[]>([
    {
      id: "1",
      username: "admin",
      name: "Administrador Sistema",
      email: "admin@mitienda.com",
      role: "admin",
      status: "active",
      createdAt: new Date(),
    },
    {
      id: "2",
      username: "cajero1",
      name: "Juan Pérez",
      email: "juan@mitienda.com",
      role: "cashier",
      status: "active",
      createdAt: new Date(),
    },
  ]);

  users = computed(() => this.usersState());

  addUser(user: Omit<User, "id" | "createdAt">) {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date(),
    };
    this.usersState.update((users) => [...users, newUser]);
  }

  updateUser(id: string, userData: Partial<User>) {
    this.usersState.update((users) =>
      users.map((u) => (u.id === id ? { ...u, ...userData } : u)),
    );
  }

  deleteUser(id: string) {
    this.usersState.update((users) => users.filter((u) => u.id !== id));
  }
}
