import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UIService } from "../../services/ui.service";
import { SettingsService } from "../../services/settings.service";
import { ConfigNegocioComponent } from "./components/config-negocio/config-negocio";
import { ConfigTicketComponent } from "./components/config-ticket/config-ticket";
import { ConfigSistemaComponent } from "./components/config-sistema/config-sistema";

@Component({
  selector: "app-configuracion",
  standalone: true,
  imports: [
    CommonModule,
    ConfigNegocioComponent,
    ConfigTicketComponent,
    ConfigSistemaComponent,
  ],
  templateUrl: "./configuracion.html",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden bg-pale-slate-50",
  },
})
export class ConfiguracionComponent {
  private uiService = inject(UIService);
  private settingsService = inject(SettingsService);

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  saveAll() {
    this.settingsService.saveAll();
  }
}
