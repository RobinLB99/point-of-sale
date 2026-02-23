import { Component, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ProductService } from "../../../../services/product.service";

@Component({
  selector: "app-product-stats",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-grey-olive-100 flex items-center gap-4"
      >
        <div
          class="p-3 bg-soft-linen-50 rounded-lg text-soft-linen-600 flex items-center justify-center"
        >
          <i class="ph-bold ph-package text-2xl"></i>
        </div>
        <div>
          <p class="text-sm text-grey-olive-500 font-medium">Total Productos</p>
          <p class="text-2xl font-bold text-pale-slate-900">
            {{ totalProducts() }}
          </p>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-grey-olive-100 flex items-center gap-4"
      >
        <div
          class="p-3 bg-red-50 rounded-lg text-red-600 flex items-center justify-center"
        >
          <i class="ph-bold ph-warning-circle text-2xl"></i>
        </div>
        <div>
          <p class="text-sm text-grey-olive-500 font-medium">
            Alertas de Stock
          </p>
          <p class="text-2xl font-bold text-red-500">{{ stockAlerts() }}</p>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-grey-olive-100 flex items-center gap-4"
      >
        <div
          class="p-3 bg-green-50 rounded-lg text-green-600 flex items-center justify-center"
        >
          <i class="ph-bold ph-currency-dollar text-2xl"></i>
        </div>
        <div>
          <p class="text-sm text-grey-olive-500 font-medium">
            Valor del Inventario
          </p>
          <p class="text-2xl font-bold text-pale-slate-900">
            {{ inventoryValue() | currency }}
          </p>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-grey-olive-100 flex items-center gap-4"
      >
        <div
          class="p-3 bg-blue-50 rounded-lg text-blue-600 flex items-center justify-center"
        >
          <i class="ph-bold ph-tag text-2xl"></i>
        </div>
        <div>
          <p class="text-sm text-grey-olive-500 font-medium">
            Categoría Principal
          </p>
          <p class="text-2xl font-bold text-pale-slate-900">
            {{ mainCategory() }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class ProductStatsComponent {
  private productService = inject(ProductService);

  totalProducts = this.productService.totalProducts;
  stockAlerts = this.productService.stockAlerts;
  inventoryValue = this.productService.inventoryValue;
  mainCategory = this.productService.mainCategory;
}
