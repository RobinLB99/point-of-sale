import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Customer } from "../../../../models/customer.model";

@Component({
  selector: "app-customer-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./customer-table.html",
})
export class CustomerTableComponent {
  customers = input.required<Customer[]>();

  onEdit = output<Customer>();
  onDelete = output<string>();
  onWhatsApp = output<string>();
}
