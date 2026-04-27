import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

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
  private userService = inject(UserService);

  // Signals para manejar estados locales
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(4)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.userService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set("Credenciales incorrectas o error en el servidor.");
          console.error("Error en login:", err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
