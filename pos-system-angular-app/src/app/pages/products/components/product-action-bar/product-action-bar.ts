import { Component, input, output, inject, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductService } from "../../../../services/product.service";

@Component({
  selector: "app-product-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./product-action-bar.html"
})
export class ProductActionBarComponent {
  private productService = inject(ProductService);

  searchTerm = input<string>("");
  selectedCategory = input<string>("");

  onSearchChange = output<string>();
  onCategoryChange = output<string>();
  onNewProduct = output<void>();

  categories = computed(() => {
    const cats = this.productService.products().map((p) => p.categoria);
    return [...new Set(cats)];
  });
}
