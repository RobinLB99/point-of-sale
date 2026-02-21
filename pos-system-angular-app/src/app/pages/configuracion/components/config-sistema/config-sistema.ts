import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SettingsService } from "../../../../services/settings.service";

@Component({
  selector: "app-config-sistema",
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { class: "block" },
  template: `
    <div
      class="bg-white rounded-xl shadow-sm border border-pale-slate-200 overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-pale-slate-100 bg-white">
        <h3 class="text-cool-slate-800 font-bold flex items-center gap-2">
          <i class="ph-bold ph-gear-six text-soft-linen-600"></i>
          Preferencias del Sistema
        </h3>
      </div>

      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Moneda Principal</label
            >
            <select
              [(ngModel)]="config().currency"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 transition-all font-bold appearance-none cursor-pointer"
            >
              <option value="USD">USD - Dólar Estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso Mexicano</option>
            </select>
          </div>

          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Impresora Térmica Activa</label
            >
            <div class="relative">
              <i
                class="ph-bold ph-printer absolute left-3 top-1/2 -translate-y-1/2 text-pale-slate-400"
              ></i>
              <input
                type="text"
                [(ngModel)]="config().printerName"
                class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 transition-all font-mono"
                placeholder="Ej. EPSON_TM_T20II"
              />
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between p-4 bg-pale-slate-50 rounded-xl border border-pale-slate-100"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-soft-linen-600 shadow-sm"
            >
              <i class="ph-bold ph-percent text-xl"></i>
            </div>
            <div>
              <p class="text-sm font-bold text-cool-slate-800">
                Cobro con IVA por defecto
              </p>
              <p class="text-[10px] text-pale-slate-500 font-medium">
                Aplica impuestos automáticamente a nuevos productos
              </p>
            </div>
          </div>

          <!-- Toggle Switch -->
          <button
            (click)="config().defaultVAT = !config().defaultVAT"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
            [ngClass]="
              config().defaultVAT ? 'bg-soft-linen-600' : 'bg-pale-slate-300'
            "
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              [ngClass]="
                config().defaultVAT ? 'translate-x-6' : 'translate-x-1'
              "
            ></span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConfigSistemaComponent {
  private settingsService = inject(SettingsService);
  config = this.settingsService.system;
}
