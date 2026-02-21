import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UIService } from "../../services/ui.service";
import { CashControlService } from "../../services/cash-control.service";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.css",
})
export class SidebarComponent {
  uiService = inject(UIService);
  public cashControlService = inject(CashControlService);
  isOpen = this.uiService.sidebarOpen;

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
