import { Component, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { CreditService } from "../../../../services/credit.service";

@Component({
  selector: "app-credit-stats",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./credit-stats.html",
})
export class CreditStatsComponent {
  public creditService = inject(CreditService);
}
