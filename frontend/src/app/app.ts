import { SidebarComponent } from "./components/sidebar/sidebar";
import { Component, signal, inject } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("Mi Tienda POS System");
  private router = inject(Router);
  private userService = inject(UserService);
  showSidebar = signal(true);

  constructor() {
    // Verificamos la sesión al iniciar la app
    this.userService.checkSession().subscribe();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showSidebar.set(event.urlAfterRedirects !== "/login");
      });
  }
}
