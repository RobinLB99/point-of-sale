import {
  Component,
  inject,
  signal,
  ElementRef,
  HostListener,
  viewChild,
} from "@angular/core";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { UIService } from "../../services/ui.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class SidebarComponent {
  uiService = inject(UIService);
  router = inject(Router);
  elementRef = inject(ElementRef);

  userMenuContainer = viewChild<ElementRef>("userMenuContainer");

  isOpen = this.uiService.sidebarOpen;
  isUserMenuOpen = signal(false);

  // Datos del usuario (Mock)
  currentUser = {
    name: "Juan Dueño",
    role: "Administrador",
    email: "juan.dueno@mitienda.com",
    initials: "JD",
  };

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen.update((v) => !v);
  }

  logout() {
    console.log("Cerrando sesión...");
    this.isUserMenuOpen.set(false);
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
    if (event) {
      event.preventDefault();
    }
    this.isUserMenuOpen.set(false);
    this.router.navigate([path]);
    if (window.innerWidth < 1024) {
      this.uiService.closeSidebar();
    }
  }
}
