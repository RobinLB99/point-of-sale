import { Component, inject } from "@angular/core";
import { UIService } from "../../services/ui.service";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet, Router } from "@angular/router";
import { CashControlService } from "../../services/cash-control.service";

// Nuevos Componentes
import { CashStatsComponent } from "./components/cash-stats/cash-stats";
import { CashActionBarComponent } from "./components/cash-action-bar/cash-action-bar";
import { CashMovementTableComponent } from "./components/cash-movement-table/cash-movement-table";

@Component({
  selector: "app-cash-control",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CashStatsComponent,
    CashActionBarComponent,
    CashMovementTableComponent,
  ],
  templateUrl: "./cash-control.html",
  styleUrl: "./cash-control.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class CashControlComponent {
  public router = inject(Router);
  private uiService = inject(UIService);
  public cashControlService = inject(CashControlService);

  // Access state directly from the service
  isCashOpen = this.cashControlService.isCashOpen;
  cashStatus = this.cashControlService.cashStatus;
  movements = this.cashControlService.movements;

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  closeCashRegister() {
    if (
      confirm(
        "¿Estás seguro de que deseas cerrar la caja? Esta acción finalizará el turno actual.",
      )
    ) {
      this.cashControlService.closeCashRegister();
    }
  }

  exportMovements() {
    console.log("Exportando movimientos...");
    // Implementación futura de exportación
  }
}
