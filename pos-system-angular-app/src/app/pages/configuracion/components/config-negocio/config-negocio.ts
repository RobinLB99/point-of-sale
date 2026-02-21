import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SettingsService } from "../../../../services/settings.service";

@Component({
  selector: "app-config-negocio",
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { class: "block" },
  template: `
    <div
      class="bg-white rounded-xl shadow-sm border border-pale-slate-200 overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-pale-slate-100 bg-white">
        <h3 class="text-cool-slate-800 font-bold flex items-center gap-2">
          <i class="ph-bold ph-storefront text-soft-linen-600"></i>
          Información del Local
        </h3>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Nombre de la Tienda</label
            >
            <input
              type="text"
              [(ngModel)]="config().name"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 focus:border-transparent transition-all placeholder:text-pale-slate-400 font-medium"
              placeholder="Ej. Bodeguita Don Pepe"
            />
          </div>

          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >RUC / Identificación</label
            >
            <input
              type="text"
              [(ngModel)]="config().ruc"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 focus:border-transparent transition-all placeholder:text-pale-slate-400 font-medium"
              placeholder="1700000000001"
            />
          </div>

          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Teléfono de Contacto</label
            >
            <input
              type="text"
              [(ngModel)]="config().phone"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 focus:border-transparent transition-all placeholder:text-pale-slate-400 font-medium"
              placeholder="09..."
            />
          </div>

          <div class="md:col-span-2">
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Dirección Física</label
            >
            <input
              type="text"
              [(ngModel)]="config().address"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 focus:border-transparent transition-all placeholder:text-pale-slate-400 font-medium"
              placeholder="Escriba la dirección completa..."
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConfigNegocioComponent {
  private settingsService = inject(SettingsService);
  config = this.settingsService.business;
}
