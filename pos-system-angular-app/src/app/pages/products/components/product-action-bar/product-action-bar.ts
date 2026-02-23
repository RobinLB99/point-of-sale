import { Component, input, output, inject, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductService } from "../../../../services/product.service";

@Component({
  selector: "app-product-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="bg-white rounded-xl p-4 border border-grey-olive-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center"
    >
      <!-- Buscador -->
      <div class="flex-1 relative w-full group">
        <i
          class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-grey-olive-400 group-focus-within:text-soft-linen-500"
        ></i>
        <input
          type="text"
          [ngModel]="searchTerm()"
          (ngModelChange)="onSearchChange.emit($event)"
          placeholder="Buscar producto por nombre o código..."
          class="w-full pl-11 pr-4 py-3 bg-grey-olive-50 border border-grey-olive-100 rounded-xl focus:outline-none focus:border-soft-linen-500 focus:bg-white transition-all text-sm"
        />
      </div>

      <!-- Filtro Categoría -->
      <div class="w-full md:w-64 relative">
        <i
          class="ph ph-funnel absolute left-4 top-1/2 -translate-y-1/2 text-grey-olive-400"
        ></i>
        <select
          [ngModel]="selectedCategory()"
          (ngModelChange)="onCategoryChange.emit($event)"
          class="w-full pl-11 pr-4 py-3 bg-grey-olive-50 border border-grey-olive-100 rounded-xl focus:outline-none focus:border-soft-linen-500 focus:bg-white transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="">Todas las categorías</option>
          <option *ngFor="let cat of categories()" [value]="cat">
            {{ cat }}
          </option>
        </select>
        <i
          class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-grey-olive-400 pointer-events-none"
        ></i>
      </div>

      <!-- Botón Nuevo -->
      <button
        (click)="onNewProduct.emit()"
        class="w-full md:w-auto bg-soft-linen-600 hover:bg-soft-linen-500 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 whitespace-nowrap"
      >
        <i class="ph-bold ph-plus"></i>
        <span>Nuevo Producto</span>
      </button>
    </div>
  `,
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
