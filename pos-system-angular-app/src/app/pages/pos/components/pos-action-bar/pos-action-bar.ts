import { Component, input, output, inject, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-pos-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="bg-white rounded-xl p-4 border border-grey-olive-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center"
    >
      <!-- Buscador -->
      <div class="flex-1 relative w-full group">
        <i
          class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-grey-olive-400 group-focus-within:text-soft-linen-500"
        ></i>
        <input
          type="text"
          [ngModel]="searchQuery()"
          (ngModelChange)="onSearchChange.emit($event)"
          [disabled]="!isCashOpen()"
          placeholder="Buscar productos..."
          class="w-full pl-11 pr-4 py-3 bg-grey-olive-50 border border-grey-olive-100 rounded-xl focus:outline-none focus:border-soft-linen-500 focus:bg-white transition-all text-sm disabled:opacity-50"
        />
      </div>

      <!-- Selector de Categorías -->
      <div class="w-full md:w-64 relative">
        <i
          class="ph ph-tag absolute left-4 top-1/2 -translate-y-1/2 text-grey-olive-400"
        ></i>
        <select
          [ngModel]="selectedCategory()"
          (ngModelChange)="onCategoryChange.emit($event)"
          [disabled]="!isCashOpen()"
          class="w-full pl-11 pr-10 py-3 bg-grey-olive-50 border border-grey-olive-100 rounded-xl focus:outline-none focus:border-soft-linen-500 focus:bg-white transition-all text-sm appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="all">Todas las categorías</option>
          @for (cat of categories(); track cat) {
            <option *ngIf="cat !== 'all'" [value]="cat">{{ cat }}</option>
          }
        </select>
        <i
          class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-grey-olive-400 pointer-events-none"
        ></i>
      </div>

      <!-- Botón Limpiar -->
      <button
        (click)="onClearCart.emit()"
        [disabled]="!isCashOpen()"
        class="w-full md:w-auto p-3 text-pale-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2"
        title="Limpiar Venta"
      >
        <i class="ph ph-trash text-2xl"></i>
        <span class="md:hidden font-bold">Vaciar Carrito</span>
      </button>
    </div>
  `,
})
export class PosActionBarComponent {
  searchQuery = input<string>("");
  selectedCategory = input<string>("all");
  categories = input<string[]>([]);
  isCashOpen = input<boolean>(true);

  onSearchChange = output<string>();
  onCategoryChange = output<string>();
  onClearCart = output<void>();
}
