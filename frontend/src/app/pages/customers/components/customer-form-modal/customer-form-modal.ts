import { Component, input, output, inject, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Customer } from "../../../../models/customer.model";

@Component({
  selector: "app-customer-form-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./customer-form-modal.html",
})
export class CustomerFormModalComponent {
  private fb = inject(FormBuilder);

  isOpen = input.required<boolean>();
  customer = input<Customer | null>(null);

  onClose = output<void>();
  onSave = output<any>();

  customerForm: FormGroup;

  constructor() {
    this.customerForm = this.fb.group({
      name: ["", [Validators.required]],
      phone: [""],
      cedula: [""],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
      currentDebt: [0, [Validators.required, Validators.min(0)]],
    });

    effect(() => {
      const customerData = this.customer();
      if (customerData) {
        this.customerForm.patchValue(customerData);
      } else {
        this.customerForm.reset({
          name: "",
          phone: "",
          cedula: "",
          creditLimit: 0,
          currentDebt: 0,
        });
      }
    });
  }

  submit() {
    if (this.customerForm.valid) {
      this.onSave.emit(this.customerForm.value);
    }
  }
}
