import { Component, input, output, signal } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Debtor } from "../../../../services/credit.service";

@Component({
  selector: "app-abono-modal",
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: "./abono-modal.html",
})
export class AbonoModalComponent {
  debtor = input<Debtor | null>(null);
  onClose = output<void>();
  onSave = output<number>();

  amount = signal<number | null>(null);

  save() {
    if (this.amount() && this.amount()! > 0) {
      this.onSave.emit(this.amount()!);
    }
  }
}
