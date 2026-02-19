import { Component, inject } from "@angular/core";
import { UIService } from "../../services/ui.service";

@Component({
  selector: "app-dashboard",
  imports: [],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard {
  private uiService = inject(UIService);

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
