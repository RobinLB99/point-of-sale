import { Component, input, output, inject, computed } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { Debtor, CreditService } from "../../../../services/credit.service";

@Component({
  selector: "app-client-panel",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./client-panel.html",
})
export class ClientPanelComponent {
  private creditService = inject(CreditService);

  debtor = input<Debtor | null>(null);
  cashOpen = input<boolean>(false);
  onOpenAbono = output<void>();

  movements = computed(() => {
    const d = this.debtor();
    return d ? this.creditService.getMovementsByDebtor(d.id) : [];
  });
}
