import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CashControlService } from "../../../../services/cash-control.service"; // Adjust path

@Component({
  selector: "app-income-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./income-form.html",
})
export class IncomeFormComponent {
  private router = inject(Router);
  private cashControlService = inject(CashControlService);

  income = {
    description: "",
    amount: null as number | null,
  };

  save() {
    if (
      this.income.amount !== null &&
      this.income.amount > 0 &&
      this.income.description
    ) {
      this.cashControlService.registerIncome(
        this.income.amount,
        this.income.description,
      );
      this.close();
    } else {
      alert(
        "Por favor, ingresa una descripción y un monto válido para el ingreso.",
      );
    }
  }

  close() {
    this.router.navigate(["/movements"]);
  }
}
