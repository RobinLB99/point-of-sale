import { Component, input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: "app-cash-status-banner",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./cash-status-banner.html",
})
export class CashStatusBannerComponent {
  public router = inject(Router);
  isOpen = input<boolean>(true);
}
