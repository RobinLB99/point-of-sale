import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Signals para manejar estados locales
  isLoading = signal(false);
  showPassword = signal(false);

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(5)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      console.log("Intento de login:", this.loginForm.value);

      // Simulamos una latencia de red para ver el efecto de carga
      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(["/dashboard"]);
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
