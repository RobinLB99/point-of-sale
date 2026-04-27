import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cash-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash-stats.html',
})
export class CashStatsComponent {
  initialBalance = input.required<number>();
  openedAt = input.required<string>();
  cashSales = input.required<number>();
  expenses = input.required<number>();
  expectedTotal = input.required<number>();
}
