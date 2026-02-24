import { Component, model, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-customer-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./customer-action-bar.html",
})
export class CustomerActionBarComponent {
  searchTerm = model<string>("");
  selectedStatus = model<string>("");

  onAddCustomer = output<void>();
}
