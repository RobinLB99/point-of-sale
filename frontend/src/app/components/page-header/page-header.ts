import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UIService } from "../../services/ui.service";
import { CashControlService } from "../../services/cash-control.service";
import { NotificationCenterComponent } from "../notification-center/notification-center";

@Component({
  selector: "app-page-header",
  standalone: true,
  imports: [NotificationCenterComponent],
  templateUrl: "./page-header.html",
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PageHeaderComponent {
  @Input({ required: true }) title: string = "";

  private uiService = inject(UIService);
  public cashControlService = inject(CashControlService);
  private router = inject(Router);

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  navigateToOpenCash() {
    this.router.navigate(["/open-cash"]);
  }
}
