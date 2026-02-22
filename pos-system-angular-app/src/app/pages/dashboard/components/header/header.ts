import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "dashboard-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.html",
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Header {
  @Input() isCashOpen: boolean = false;
  @Output() onToggleSidebar = new EventEmitter<void>();

  private router = inject(Router);

  toggleSidebar() {
    this.onToggleSidebar.emit();
  }

  goToNewSale() {
    this.router.navigate(["/pos"]);
  }
}
