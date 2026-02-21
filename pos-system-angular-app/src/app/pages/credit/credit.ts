import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import { CreditService, Debtor } from "../../services/credit.service";
import { UIService } from "../../services/ui.service";
import { CashControlService } from "../../services/cash-control.service";

@Component({
  selector: "app-credit",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./credit.html",
  styleUrls: ["./credit.css"],
})
export class CreditComponent {
  public router = inject(Router);
  public creditService = inject(CreditService);
  public cashControlService = inject(CashControlService);
  private uiService = inject(UIService);
  protected Math = Math;

  searchTerm = signal("");
  selectedDebtor = signal<Debtor | null>(null);
  abonoAmount = signal<number | null>(null);
  showAbonoModal = signal(false);

  // Pagination
  currentPage = signal(1);
  itemsPerPage = signal(5);

  filteredDebtors = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.creditService
      .debtors()
      .filter(
        (d) => d.name.toLowerCase().includes(term) || d.phone.includes(term),
      );
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredDebtors().length / this.itemsPerPage());
  });

  paginatedDebtors = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.filteredDebtors().slice(start, end);
  });

  selectedDebtorMovements = computed(() => {
    const debtor = this.selectedDebtor();
    return debtor ? this.creditService.getMovementsByDebtor(debtor.id) : [];
  });

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  onSearch(event: any) {
    this.currentPage.set(1); // Reset to first page on search
  }

  selectDebtor(debtor: Debtor) {
    this.selectedDebtor.set(debtor);
  }

  openAbonoModal() {
    if (this.selectedDebtor() && this.cashControlService.isCashOpen()) {
      this.abonoAmount.set(null);
      this.showAbonoModal.set(true);
    }
  }

  closeAbonoModal() {
    this.showAbonoModal.set(false);
  }

  registerAbono() {
    const amount = this.abonoAmount();
    const debtor = this.selectedDebtor();

    if (amount && amount > 0 && debtor) {
      this.creditService.addAbono(debtor.id, amount);
      // Refresh selected debtor to show updated debt
      const updatedDebtor = this.creditService
        .debtors()
        .find((d) => d.id === debtor.id);
      if (updatedDebtor) this.selectedDebtor.set(updatedDebtor);
      this.closeAbonoModal();
    }
  }
}
