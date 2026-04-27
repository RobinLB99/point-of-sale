import { Injectable, signal, computed } from "@angular/core";
import { Notification } from "../models/notification.model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private _notifications = signal<Notification[]>([
    {
      id: "1",
      type: "warning",
      title: "Stock Bajo",
      message: "El producto 'Leche 1L' está por agotarse.",
      timestamp: new Date(),
      isRead: false,
    },
    {
      id: "2",
      type: "info",
      title: "Caja Abierta",
      message: "Se ha abierto la caja con $5,000.00 MXN.",
      timestamp: new Date(),
      isRead: true,
    },
  ]);

  // Exponemos las notificaciones como de solo lectura para proteger el estado
  notifications = this._notifications.asReadonly();

  // Signal computada para el conteo de no leídas (eficiencia pura)
  unreadCount = computed(
    () => this._notifications().filter((n) => !n.isRead).length,
  );

  addNotification(
    notification: Omit<Notification, "id" | "timestamp" | "isRead">,
  ) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      isRead: false,
    };
    this._notifications.update((prev) => [newNotification, ...prev]);
  }

  markAsRead(id: string) {
    this._notifications.update((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }

  markAllAsRead() {
    this._notifications.update((prev) =>
      prev.map((n) => ({ ...n, isRead: true })),
    );
  }

  removeNotification(id: string) {
    this._notifications.update((prev) => prev.filter((n) => n.id !== id));
  }

  clearAll() {
    this._notifications.set([]);
  }
}
