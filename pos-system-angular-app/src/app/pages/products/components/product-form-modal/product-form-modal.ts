import { Component, input, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="px-6 py-4 border-b border-grey-olive-100 flex items-center justify-between bg-white">
          <h3 class="text-lg font-bold text-pale-slate-900">
            {{ editingProduct() ? 'Editar Producto' : 'Registrar Nuevo Producto' }}
          </h3>
          <button (click)="onClose.emit()" class="text-grey-olive-400 hover:text-grey-olive-600 transition-colors p-1">
            <i class="ph-bold ph-x text-2xl"></i>
          </button>
        </div>

        <form [formGroup]="productForm" (ngSubmit)="save()" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-pale-slate-700 mb-1">Nombre del Producto</label>
              <input type="text" formControlName="nombre" placeholder="Ej. Coca Cola 600ml"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-pale-slate-700 mb-1">Categoría</label>
              <select formControlName="categoria"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none bg-white transition-all">
                <option value="" disabled selected>Seleccione una categoría</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Snacks">Snacks</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Panadería">Panadería</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-pale-slate-700 mb-1">Precio Costo ($)</label>
              <input type="number" step="0.01" formControlName="precioCosto"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-pale-slate-700 mb-1">Precio Venta ($)</label>
              <input type="number" step="0.01" formControlName="precioVenta"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-pale-slate-700 mb-1">
                {{ editingProduct() ? 'Stock Actual (Solo lectura)' : 'Stock Inicial' }}
              </label>
              <input type="number" formControlName="stock"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all disabled:bg-grey-olive-50 disabled:text-grey-olive-400 disabled:cursor-not-allowed" />
              <p *ngIf="editingProduct()" class="mt-1 text-[10px] text-grey-olive-400">
                Para modificar el stock use la opción "Reabastecer" en la tabla.
              </p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-pale-slate-700 mb-1">Alerta Stock Mínimo</label>
              <input type="number" formControlName="stockMinimo"
                class="w-full px-4 py-2 border border-grey-olive-200 rounded-lg focus:ring-soft-linen-500 focus:border-soft-linen-500 outline-none transition-all" />
            </div>
          </div>

          <div class="mt-8 flex items-center justify-end gap-3">
            <button type="button" (click)="onClose.emit()"
              class="px-6 py-2 text-sm font-medium text-grey-olive-600 hover:text-grey-olive-800 transition-colors">
              Cancelar
            </button>
            <button type="submit" [disabled]="productForm.invalid"
              class="px-8 py-2 bg-soft-linen-600 text-white rounded-lg text-sm font-bold hover:bg-soft-linen-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {{ editingProduct() ? 'Actualizar Producto' : 'Guardar Producto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProductFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);

  editingProduct = input<Product | null>(null);
  onClose = output<void>();
  onSave = output<any>();

  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precioCosto: [0, [Validators.required, Validators.min(0)]],
      precioVenta: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    if (this.editingProduct()) {
      this.productForm.patchValue(this.editingProduct()!);
      this.productForm.get('stock')?.disable();
    }
  }

  save() {
    if (this.productForm.valid) {
      this.onSave.emit(this.productForm.getRawValue());
    }
  }
}
