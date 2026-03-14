import {
  Component,
  inject,
  signal,
  ElementRef,
  HostListener,
  viewChild,
  computed,
} from "@angular/core";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { UIService } from "../../services/ui.service";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class SidebarComponent {
  private uiService = inject(UIService);
  private userService = inject(UserService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  userMenuContainer = viewChild<ElementRef>("userMenuContainer");

  isOpen = this.uiService.sidebarOpen;
  isUserMenuOpen = signal(false);

  // Datos del usuario REALES del servicio
  currentUserState = this.userService.currentUser;

  // Computamos las iniciales y datos para la UI de forma segura
  currentUser = computed(() => {
    const user = this.currentUserState();
    if (!user) return null;

    return {
      ...user,
      initials: user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
      email: `${user.username}@sistema.com`, // O el campo real si lo añades al modelo
    };
  });

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen.update((v) => !v);
  }

  logout() {
    console.warn("Cerrando sesión...");
    this.isUserMenuOpen.set(false);
    this.userService.logout(); // <-- AQUÍ SE LIMPIA TODO
    this.router.navigate(["/login"]);
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    const container = this.userMenuContainer()?.nativeElement;
    if (
      container &&
      !container.contains(event.target) &&
      this.isUserMenuOpen()
    ) {
      this.isUserMenuOpen.set(false);
    }
  }

  // Cerrar menú al navegar
  navigateTo(path: string, event?: Event) {
    this.isUserMenuOpen.set(false);
    this.router.navigate([path]);
    if (window.innerWidth < 1024) {
      this.uiService.closeSidebar();
    }
  }
}
