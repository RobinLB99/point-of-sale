import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UIService } from "../../services/ui.service";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class SidebarComponent {
  uiService = inject(UIService);
  isOpen = this.uiService.sidebarOpen;

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
