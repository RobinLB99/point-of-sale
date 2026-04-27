import {
  Component,
  inject,
  signal,
  ElementRef,
  HostListener,
} from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { NotificationService } from "../../services/notification.service";
import { Notification } from "../../models/notification.model";

@Component({
  selector: "app-notification-center",
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: "./notification-center.html",
  styleUrl: "./notification-center.css",
})
export class NotificationCenterComponent {
  public notificationService = inject(NotificationService);
  private elementRef = inject(ElementRef);

  isOpen = signal(false);

  toggleNotifications() {
    this.isOpen.update((v) => !v);
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  deleteNotification(id: string, event: Event) {
    event.stopPropagation();
    this.notificationService.removeNotification(id);
  }

  // Cerrar al hacer clic fuera (un clásico de UX)
  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isOpen()
    ) {
      this.isOpen.set(false);
    }
  }

  getIconForType(type: string): string {
    switch (type) {
      case "success":
        return "ph-check-circle text-emerald-500 bg-emerald-50";
      case "warning":
        return "ph-warning text-amber-500 bg-amber-50";
      case "error":
        return "ph-x-circle text-rose-500 bg-rose-50";
      default:
        return "ph-info text-sky-500 bg-sky-50";
    }
  }
}
