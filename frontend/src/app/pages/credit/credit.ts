import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, Router } from "@angular/router";
import { CreditService, Debtor } from "../../services/credit.service";
import { UIService } from "../../services/ui.service";
import { CashControlService } from "../../services/cash-control.service";
import { PageHeaderComponent } from "../../components/page-header/page-header";

// Nuevos Componentes
import { CreditStatsComponent } from "./components/credit-stats/credit-stats";
import { CreditActionBarComponent } from "./components/credit-action-bar/credit-action-bar";
import { DebtorTableComponent } from "./components/debtor-table/debtor-table";
import { ClientPanelComponent } from "./components/client-panel/client-panel";
import { AbonoModalComponent } from "./components/abono-modal/abono-modal";

@Component({
  selector: "app-credit",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    CreditStatsComponent,
    CreditActionBarComponent,
    DebtorTableComponent,
    ClientPanelComponent,
    AbonoModalComponent,
  ],
  templateUrl: "./credit.html",
  styleUrls: ["./credit.css"],
})
export class CreditComponent {
  public router = inject(Router);
  public creditService = inject(CreditService);
  public cashControlService = inject(CashControlService);
  private uiService = inject(UIService);

  searchTerm = signal("");
  selectedDebtor = signal<Debtor | null>(null);
  showAbonoModal = signal(false);

  filteredDebtors = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.creditService
      .debtors()
      .filter(
        (d) => d.name.toLowerCase().includes(term) || d.phone.includes(term),
      );
  });

  selectDebtor(debtor: Debtor) {
    this.selectedDebtor.set(debtor);
  }

  handleSearch(term: string) {
    this.searchTerm.set(term);
    // Nota: La paginación se resetea dentro del componente DebtorTable mediante inputs si fuera necesario,
    // pero aquí simplemente filtramos la lista completa que le pasamos.
  }

  openAbonoModal() {
    if (this.selectedDebtor() && this.cashControlService.isCashOpen()) {
      this.showAbonoModal.set(true);
    }
  }

  closeAbonoModal() {
    this.showAbonoModal.set(false);
  }

  registerAbono(amount: number) {
    const debtor = this.selectedDebtor();
    if (debtor) {
      this.creditService.addAbono(debtor.id, amount);
      // Actualizar selección para refrescar UI del panel
      const updated = this.creditService
        .debtors()
        .find((d) => d.id === debtor.id);
      if (updated) this.selectedDebtor.set(updated);
      this.closeAbonoModal();
    }
  }

  handleNewClient() {
    console.log("Abrir modal de nuevo cliente");
  }
}
