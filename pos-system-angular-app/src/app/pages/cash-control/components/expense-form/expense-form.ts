import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CashControlService } from "../../../../services/cash-control.service"; // Adjust path

@Component({
  selector: "app-expense-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./expense-form.html",
})
export class ExpenseFormComponent {
  private router = inject(Router);
  private cashControlService = inject(CashControlService);

  expense = {
    description: "",
    amount: null as number | null,
  };

  save() {
    if (
      this.expense.amount !== null &&
      this.expense.amount > 0 &&
      this.expense.description
    ) {
      this.cashControlService.registerExpense(
        this.expense.amount,
        this.expense.description,
      );
      this.close();
    } else {
      alert(
        "Por favor, ingresa una descripción y un monto válido para el gasto.",
      );
    }
  }

  close() {
    this.router.navigate(["/movements"]);
  }
}
