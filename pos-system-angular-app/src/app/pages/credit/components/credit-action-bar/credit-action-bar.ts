import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-credit-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./credit-action-bar.html",
})
export class CreditActionBarComponent {
  searchTerm = input<string>("");
  onSearchChange = output<string>();
  onNewClient = output<void>();
}
