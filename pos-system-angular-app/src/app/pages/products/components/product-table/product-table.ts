import { Component, input, output } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { Product, getProductStatus } from "../../../../models/product.model";

@Component({
  selector: "app-product-table",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div
      class="bg-white rounded-xl shadow-sm border border-grey-olive-200 overflow-hidden mb-8"
    >
      <div
        class="px-6 py-4 border-b border-grey-olive-100 bg-white flex items-center justify-between"
      >
        <h3 class="font-bold text-pale-slate-800">Listado de Productos</h3>
        <button
          class="text-soft-linen-600 hover:text-soft-linen-700 text-sm font-bold flex items-center gap-1"
        >
          <i class="ph-bold ph-download-simple"></i>
          Exportar
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead
            class="bg-grey-olive-50 text-grey-olive-600 font-bold uppercase text-[10px] tracking-widest"
          >
            <tr>
              <th class="px-6 py-4">Nombre del Producto</th>
              <th class="px-6 py-4">Categoría</th>
              <th class="px-6 py-4 text-right">Costo</th>
              <th class="px-6 py-4 text-right">V. Público</th>
              <th class="px-6 py-4 text-center">Stock</th>
              <th class="px-6 py-4 text-center">Estado</th>
              <th class="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-grey-olive-100">
            <tr
              *ngFor="let product of products()"
              class="hover:bg-grey-olive-50/50 transition-colors group"
            >
              <td class="px-6 py-4">
                <span class="font-medium text-pale-slate-900">{{
                  product.nombre
                }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-grey-olive-500">{{
                  product.categoria
                }}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="text-sm text-grey-olive-500">{{
                  product.precioCosto | currency
                }}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="font-bold text-pale-slate-900">{{
                  product.precioVenta | currency
                }}</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span
                  class="text-sm font-medium"
                  [class.text-red-600]="product.stock <= product.stockMinimo"
                >
                  {{ product.stock }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                @let status = getStatus(product.stock, product.stockMinimo);
                <span
                  [class]="
                    'px-3 py-1 rounded-full text-xs font-medium border ' +
                    getStatusClass(status)
                  "
                >
                  {{ status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    (click)="onRestock.emit(product)"
                    class="p-1.5 text-grey-olive-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="Reabastecer"
                  >
                    <i class="ph-bold ph-plus-circle text-lg"></i>
                  </button>
                  <button
                    (click)="onEdit.emit(product)"
                    class="p-1.5 text-grey-olive-400 hover:text-soft-linen-600 hover:bg-soft-linen-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <i class="ph-bold ph-pencil-simple text-lg"></i>
                  </button>
                  <button
                    (click)="onDelete.emit(product.id)"
                    class="p-1.5 text-grey-olive-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Eliminar"
                  >
                    <i class="ph-bold ph-trash text-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="products().length === 0" class="p-12 text-center">
        <i class="ph ph-magnifying-glass text-4xl text-grey-olive-200 mb-3"></i>
        <p class="text-grey-olive-500">
          No se encontraron productos que coincidan con la búsqueda.
        </p>
      </div>
    </div>
  `,
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
