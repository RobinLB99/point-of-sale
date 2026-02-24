import { Component, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ProductService } from "../../../../services/product.service";

@Component({
  selector: "app-product-stats",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./product-stats.html",
})
export class ProductStatsComponent {
  private productService = inject(ProductService);

  totalProducts = this.productService.totalProducts;
  stockAlerts = this.productService.stockAlerts;
  inventoryValue = this.productService.inventoryValue;
  mainCategory = this.productService.mainCategory;
}
