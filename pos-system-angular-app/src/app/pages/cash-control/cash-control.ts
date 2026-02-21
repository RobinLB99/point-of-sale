import { Component, inject } from "@angular/core";
import { UIService } from "../../services/ui.service";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet, Router } from "@angular/router";
import { CashControlService } from "../../services/cash-control.service"; // Import the service

@Component({
  selector: "app-cash-control",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: "./cash-control.html",
  styleUrl: "./cash-control.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class CashControlComponent {
  public router = inject(Router);
  private uiService = inject(UIService);
  public cashControlService = inject(CashControlService); // Make public for template access

  // Access state directly from the service
  isCashOpen = this.cashControlService.isCashOpen;
  cashStatus = this.cashControlService.cashStatus;
  movements = this.cashControlService.movements;

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  // Delegate cash register operations to the service
  closeCashRegister() {
    if (
      confirm(
        "¿Estás seguro de que deseas cerrar la caja? Esta acción finalizará el turno actual.",
      )
    ) {
      this.cashControlService.closeCashRegister();
    }
  }
}
