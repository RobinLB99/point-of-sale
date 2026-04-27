import { Component, input, output, inject, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Supplier } from "../../../../models/supplier.model";

@Component({
  selector: "app-supplier-form-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./supplier-form-modal.html",
})
export class SupplierFormModalComponent {
  private fb = inject(FormBuilder);

  isOpen = input.required<boolean>();
  supplier = input<Supplier | null>(null);
  daysOfWeek = input.required<string[]>();

  onClose = output<void>();
  onSave = output<any>();

  supplierForm: FormGroup;

  constructor() {
    this.supplierForm = this.fb.group({
      empresa: ["", [Validators.required]],
      vendedor: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      diaVisita: ["Lunes", [Validators.required]],
      activo: [true],
    });

    effect(() => {
      const supplierData = this.supplier();
      if (supplierData) {
        this.supplierForm.patchValue(supplierData);
      } else {
        this.supplierForm.reset({
          empresa: "",
          vendedor: "",
          telefono: "",
          diaVisita: "Lunes",
          activo: true,
        });
      }
    });
  }

  submit() {
    if (this.supplierForm.valid) {
      this.onSave.emit(this.supplierForm.value);
    }
  }
}
