import { SidebarComponent } from "./components/sidebar/sidebar";
import { Component, signal, inject } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("Mi Tienda POS System");
  private router = inject(Router);
  showSidebar = signal(true);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showSidebar.set(event.urlAfterRedirects !== "/login");
      });
  }
}
