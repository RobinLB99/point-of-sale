import { Component, inject } from "@angular/core";
import { CommonModule, Location } from "@angular/common"; // Import Location
import { Router, ActivatedRoute } from "@angular/router"; // Import ActivatedRoute
import { FormsModule } from "@angular/forms";
import { CashControlService } from "../../services/cash-control.service";

@Component({
  selector: "app-open-cash-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./open-cash-form.html",
})
export class OpenCashFormComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute); // Inject ActivatedRoute
  private location = inject(Location); // Inject Location
  private cashControlService = inject(CashControlService);

  cashOpenData = {
    initialBalance: null as number | null,
    description: "",
  };

  openCash() {
    if (this.cashOpenData.initialBalance !== null) {
      this.cashControlService.openCashRegister(
        this.cashOpenData.initialBalance,
        this.cashOpenData.description,
      );

      const returnUrl =
        this.activatedRoute.snapshot.queryParams["returnUrl"] || "/dashboard";
      this.router.navigateByUrl(returnUrl); // Navigate to the return URL or dashboard
    } else {
      alert("Por favor, ingresa un saldo inicial.");
    }
  }

  goBack() {
    this.location.back(); // Volver a la pantalla anterior
  }
}
