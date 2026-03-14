import { Injectable, signal, computed, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, AuthUser, AuthResponse } from "../models/user.model";
import { tap, catchError, of, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = "/api";
  private readonly USER_KEY = "pos_user";
  private readonly TOKEN_KEY = "pos_token";

  private currentUserState = signal<User | null>(this.loadUserFromStorage());
  private tokenState = signal<string | null>(this.loadTokenFromStorage());

  currentUser = computed(() => this.currentUserState());
  token = computed(() => this.tokenState());

  isLoggedIn = computed(() => {
    const t = this.tokenState();
    return !!t && t !== "null" && t !== "undefined" && t.length > 20;
  });

  private usersState = signal<User[]>([]);
  users = computed(() => this.usersState());

  login(credentials: { username: string; password: string }) {
    // ELIMINADO withCredentials para evitar bloqueos CSRF de Spring Security
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        map((response) => {
          const adaptedUser = this.adaptAuthUser(response.user);
          this.setSession(response.token, adaptedUser);
          return adaptedUser;
        }),
      );
  }

  checkSession() {
    if (!this.isLoggedIn()) {
      this.logout();
      return of(null);
    }

    return this.http.get<AuthUser>(`${this.API_URL}/auth/me`).pipe(
      map((authUser) => {
        const user = this.adaptAuthUser(authUser);
        this.currentUserState.set(user);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        return user;
      }),
      catchError((error) => {
        this.logout();
        return of(null);
      }),
    );
  }

  logout() {
    this.currentUserState.set(null);
    this.tokenState.set(null);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.clear();
  }

  private setSession(token: string, user: User) {
    this.tokenState.set(token);
    this.currentUserState.set(user);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private loadUserFromStorage(): User | null {
    const stored = localStorage.getItem(this.USER_KEY);
    if (!stored || stored === "null" || stored === "undefined") return null;
    try {
      const u = JSON.parse(stored);
      return { ...u, createdAt: new Date(u.createdAt) };
    } catch {
      return null;
    }
  }

  private loadTokenFromStorage(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token && token !== "null" && token !== "undefined" ? token : null;
  }

  private adaptAuthUser(auth: AuthUser): User {
    return {
      id: auth.id.toString(),
      username: auth.username,
      name: auth.name,
      email: `${auth.username}@sistema.com`,
      role: (auth.roles?.[0]?.toLowerCase() as any) || "cashier",
      status: "active",
      createdAt: new Date(auth.createdAt),
    };
  }

  loadUsers() {
    return this.http.get<AuthUser[]>(`${this.API_URL}/users`).pipe(
      map((authUsers) => authUsers.map((u) => this.adaptAuthUser(u))),
      tap((users) => this.usersState.set(users)),
    );
  }

  addUser(user: any) {
    return this.http
      .post<AuthUser>(`${this.API_URL}/users`, user)
      .pipe(
        map((auth) => this.adaptAuthUser(auth)),
        tap((newUser) =>
          this.usersState.update((users) => [...users, newUser]),
        ),
      )
      .subscribe();
  }

  updateUser(id: string, userData: any) {
    return this.http
      .patch<AuthUser>(`${this.API_URL}/users/${id}`, userData)
      .pipe(
        map((auth) => this.adaptAuthUser(auth)),
        tap((updatedUser) =>
          this.usersState.update((users) =>
            users.map((u) => (u.id === id ? updatedUser : u)),
          ),
        ),
      )
      .subscribe();
  }

  deleteUser(id: string) {
    return this.http
      .delete(`${this.API_URL}/users/${id}`)
      .pipe(
        tap(() =>
          this.usersState.update((users) => users.filter((u) => u.id !== id)),
        ),
      )
      .subscribe();
  }
}
