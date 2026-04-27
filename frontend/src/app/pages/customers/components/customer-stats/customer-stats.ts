import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-customer-stats",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./customer-stats.html",
})
export class CustomerStatsComponent {
  totalCustomers = input.required<number>();
  customersWithDebtCount = input.required<number>();
  customersAtLimitCount = input.required<number>();
}
