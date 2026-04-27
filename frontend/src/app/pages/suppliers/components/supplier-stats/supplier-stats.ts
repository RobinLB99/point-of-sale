import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-supplier-stats",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./supplier-stats.html",
})
export class SupplierStatsComponent {
  totalSuppliers = input.required<number>();
  visitsTodayCount = input.required<number>();
  activeSuppliers = input.required<number>();
}
