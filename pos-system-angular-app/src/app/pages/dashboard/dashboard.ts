import { Component, inject } from "@angular/core";
import { UIService } from "../../services/ui.service";
import { CashControlService } from "../../services/cash-control.service"; // Import CashControlService

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard {
  private uiService = inject(UIService);
  cashControlService = inject(CashControlService); // Inyectar CashControlService

  // Exponer el estado de la caja a la plantilla
  isCashOpen = this.cashControlService.isCashOpen;

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
