import { Component, model, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-supplier-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./supplier-action-bar.html",
})
export class SupplierActionBarComponent {
  searchTerm = model<string>("");
  selectedDay = model<string>("");
  daysOfWeek = input.required<string[]>();

  onAddSupplier = output<void>();
}
