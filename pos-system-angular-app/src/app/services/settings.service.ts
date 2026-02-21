import { Injectable, signal } from "@angular/core";

export interface BusinessConfig {
  name: string;
  ruc: string;
  phone: string;
  address: string;
}

export interface TicketConfig {
  headerMessage: string;
  footerMessage: string;
}

export interface SystemConfig {
  currency: string;
  printerName: string;
  defaultVAT: boolean;
}

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  // Signals para persistencia reactiva
  public business = signal<BusinessConfig>({
    name: "Bodeguita Don Pepe",
    ruc: "1790011223001",
    phone: "0987654321",
    address: "Av. de los Granados y Av. 6 de Diciembre, Quito",
  });

  public ticket = signal<TicketConfig>({
    headerMessage: "Venta de abarrotes en general",
    footerMessage: "¡Gracias por su compra! Vuelva pronto.",
  });

  public system = signal<SystemConfig>({
    currency: "USD",
    printerName: "POS-58",
    defaultVAT: false,
  });

  updateBusiness(config: BusinessConfig) {
    this.business.set(config);
  }

  updateTicket(config: TicketConfig) {
    this.ticket.set(config);
  }

  updateSystem(config: SystemConfig) {
    this.system.set(config);
  }

  saveAll() {
    // Aquí iría la llamada al backend Spring Boot en el futuro
    console.log("Guardando configuración...", {
      business: this.business(),
      ticket: this.ticket(),
      system: this.system(),
    });
    alert("Configuración guardada exitosamente.");
  }
}
