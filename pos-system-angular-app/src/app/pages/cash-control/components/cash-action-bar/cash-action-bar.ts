import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-cash-action-bar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./cash-action-bar.html",
})
export class CashActionBarComponent {
  isCashOpen = input.required<boolean>();
  currentUrl = input.required<string>();

  onCloseCash = output<void>();
}
