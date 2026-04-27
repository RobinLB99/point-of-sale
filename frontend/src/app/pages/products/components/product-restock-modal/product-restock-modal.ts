import { Component, input, output, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Product } from "../../../../models/product.model";

@Component({
  selector: "app-product-restock-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <div
          class="px-6 py-4 border-b border-grey-olive-100 flex items-center justify-between bg-soft-linen-50"
        >
          <h3 class="text-lg font-bold text-soft-linen-900">
            Reabastecer Stock
          </h3>
          <button
            (click)="onClose.emit()"
            class="text-grey-olive-400 hover:text-grey-olive-600 transition-colors p-1"
          >
            <i class="ph-bold ph-x text-2xl"></i>
          </button>
        </div>

        <form [formGroup]="restockForm" (ngSubmit)="save()" class="p-6">
          <div class="mb-4">
            <p class="text-sm text-grey-olive-500 mb-1">Producto:</p>
            <p class="text-lg font-bold text-pale-slate-900">
              {{ product()?.nombre }}
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <label
                class="block text-sm font-semibold text-pale-slate-700 mb-1"
                >Cantidad a Añadir</label
              >
              <input
                type="number"
                formControlName="cantidad"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all text-center text-lg font-bold"
                autofocus
              />
              <p class="text-xs text-grey-olive-400 mt-1">
                Stock actual: {{ product()?.stock }} → Nuevo:
                {{
                  (product()?.stock || 0) +
                    (restockForm.get("cantidad")?.value || 0)
                }}
              </p>
            </div>

            <div>
              <label
                class="block text-sm font-semibold text-pale-slate-700 mb-1"
                >Precio de Costo de esta Compra ($)</label
              >
              <input
                type="number"
                step="0.01"
                formControlName="precioCosto"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all text-center text-lg font-bold"
              />
              @if (
                restockForm.get("precioCosto")?.value !== product()?.precioCosto
              ) {
                <p
                  class="text-[10px] text-amber-600 mt-1 font-medium flex items-center gap-1"
                >
                  <i class="ph-bold ph-warning"></i>
                  El precio de costo base del producto se actualizará.
                </p>
              }
            </div>
          </div>

          <div class="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              (click)="onClose.emit()"
              class="px-6 py-2 text-sm font-medium text-grey-olive-600 hover:text-grey-olive-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="restockForm.invalid"
              class="px-8 py-3 bg-soft-linen-600 text-white rounded-xl text-sm font-bold hover:bg-soft-linen-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              Confirmar Entrada
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProductRestockModalComponent implements OnInit {
  private fb = inject(FormBuilder);

  product = input<Product | null>(null);
  onClose = output<void>();
  onSave = output<{ cantidad: number; precioCosto: number }>();

  restockForm: FormGroup;

  constructor() {
    this.restockForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(0.01)]],
      precioCosto: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    if (this.product()) {
      this.restockForm.patchValue({
        precioCosto: this.product()!.precioCosto,
      });
    }
  }

  save() {
    if (this.restockForm.valid) {
      this.onSave.emit(this.restockForm.value);
    }
  }
}
