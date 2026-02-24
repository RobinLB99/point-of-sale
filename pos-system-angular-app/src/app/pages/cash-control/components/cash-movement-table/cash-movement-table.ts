import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cash-movement-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./cash-movement-table.html",
})
export class CashMovementTableComponent {
  movements = input.required<any[]>();
  onExport = output<void>();
}
