import { Component, input, output } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { Product, getProductStatus } from "../../../../models/product.model";

@Component({
  selector: "app-product-table",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./product-table.html",
})
export class ProductTableComponent {
  products = input<Product[]>([]);

  onEdit = output<Product>();
  onDelete = output<string>();
  onRestock = output<Product>();

  getStatus(stock: number, stockMinimo: number) {
    return getProductStatus(stock, stockMinimo);
  }

  getStatusClass(status: string) {
    switch (status) {
      case "Óptimo":
        return "bg-green-100 text-green-700 border-green-200";
      case "Bajo":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Agotado":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }
}
