import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SettingsService } from "../../../../services/settings.service";

@Component({
  selector: "app-config-ticket",
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { class: "block" },
  template: `
    <div
      class="bg-white rounded-xl shadow-sm border border-pale-slate-200 overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-pale-slate-100 bg-white">
        <h3 class="text-cool-slate-800 font-bold flex items-center gap-2">
          <i class="ph-bold ph-receipt text-soft-linen-600"></i>
          Diseño del Comprobante
        </h3>
      </div>

      <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulario -->
        <div class="space-y-5">
          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Mensaje de Cabecera</label
            >
            <input
              type="text"
              [(ngModel)]="config().headerMessage"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 focus:border-transparent transition-all placeholder:text-pale-slate-400 font-medium"
              placeholder="Ej. Venta de abarrotes en general"
            />
          </div>

          <div>
            <label
              class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
              >Mensaje de Pie de Página</label
            >
            <textarea
              [(ngModel)]="config().footerMessage"
              rows="3"
              class="w-full bg-pale-slate-50 border border-pale-slate-200 text-cool-slate-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-soft-linen-500 focus:border-transparent transition-all placeholder:text-pale-slate-400 font-medium resize-none"
              placeholder="¡Gracias por su compra!"
            ></textarea>
          </div>
        </div>

        <!-- Simulador Visual -->
        <div class="flex flex-col">
          <label
            class="block text-xs font-black text-pale-slate-500 uppercase tracking-widest mb-2"
            >Vista Previa del Ticket</label
          >
          <div
            class="flex-1 bg-pale-slate-100 p-6 rounded-xl border-2 border-dashed border-pale-slate-200 font-mono text-[11px] text-cool-slate-700 shadow-inner relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pale-slate-300 to-transparent opacity-50"
            ></div>

            <div class="text-center space-y-1 mb-4">
              <p class="font-bold text-sm uppercase">{{ business().name }}</p>
              <p>RUC: {{ business().ruc }}</p>
              <p>{{ business().address }}</p>
              <p>Tel: {{ business().phone }}</p>
              <p class="pt-2 border-t border-pale-slate-300 border-dashed">
                {{ config().headerMessage }}
              </p>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between">
                <span>1x ACEITE LA FAVORITA</span>
                <span>$2.50</span>
              </div>
              <div class="flex justify-between">
                <span>2x ARROZ CONEJO 1KG</span>
                <span>$3.00</span>
              </div>
              <div
                class="border-t border-pale-slate-300 border-dashed pt-1 mt-2 font-bold text-xs flex justify-between"
              >
                <span>TOTAL</span>
                <span>$5.50</span>
              </div>
            </div>

            <div
              class="text-center mt-6 pt-4 border-t border-pale-slate-300 border-dashed italic"
            >
              <p>{{ config().footerMessage }}</p>
              <p class="mt-2 text-[9px] font-sans">Powered by Mi Tienda POS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConfigTicketComponent {
  private settingsService = inject(SettingsService);
  config = this.settingsService.ticket;
  business = this.settingsService.business;
}
