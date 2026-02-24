import { Component, input, output, inject, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { User } from "../../../../models/user.model";

@Component({
  selector: "app-user-form-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./user-form-modal.html",
})
export class UserFormModalComponent {
  private fb = inject(FormBuilder);

  isOpen = input.required<boolean>();
  user = input<User | null>(null);

  onClose = output<void>();
  onSave = output<any>();

  userForm: FormGroup;

  constructor() {
    this.userForm = this.fb.group({
      name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.email]],
      role: ["cashier", [Validators.required]],
      status: ["active", [Validators.required]],
      password: [""],
    });

    effect(() => {
      const userData = this.user();
      if (userData) {
        this.userForm.patchValue(userData);
        this.userForm.get("password")?.clearValidators();
      } else {
        this.userForm.reset({
          name: "",
          username: "",
          email: "",
          role: "cashier",
          status: "active",
          password: "",
        });
        this.userForm.get("password")?.setValidators([Validators.required]);
      }
      this.userForm.get("password")?.updateValueAndValidity();
    });
  }

  submit() {
    if (this.userForm.valid) {
      this.onSave.emit(this.userForm.value);
    }
  }
}
