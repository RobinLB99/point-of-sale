import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Supplier } from "../../../../models/supplier.model";

@Component({
  selector: "app-supplier-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./supplier-table.html",
})
export class SupplierTableComponent {
  suppliers = input.required<Supplier[]>();

  onEdit = output<Supplier>();
  onDelete = output<string>();
  onWhatsApp = output<string>();
}
