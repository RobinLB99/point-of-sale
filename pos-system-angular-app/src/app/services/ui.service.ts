import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UIService {
  private _sidebarOpen = signal(false);

  sidebarOpen = this._sidebarOpen.asReadonly();

  toggleSidebar() {
    this._sidebarOpen.update((open) => !open);
  }

  closeSidebar() {
    this._sidebarOpen.set(false);
  }

  openSidebar() {
    this._sidebarOpen.set(true);
  }
}
