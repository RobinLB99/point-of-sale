import { Component, Input, inject } from "@angular/core";
import { UIService } from "../../services/ui.service";

@Component({
  selector: "app-page-header",
  standalone: true,
  imports: [],
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

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
