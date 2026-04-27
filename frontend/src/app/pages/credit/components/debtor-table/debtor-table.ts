import { Component, input, output, computed, signal } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { Debtor } from "../../../../services/credit.service";

@Component({
  selector: "app-debtor-table",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./debtor-table.html",
})
export class DebtorTableComponent {
  debtors = input<Debtor[]>([]);
  selectedId = input<number | undefined>();
  onSelect = output<Debtor>();

  currentPage = signal(1);
  itemsPerPage = signal(5);
  protected Math = Math;

  totalPages = computed(() =>
    Math.ceil(this.debtors().length / this.itemsPerPage()),
  );
  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  paginatedDebtors = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.debtors().slice(start, start + this.itemsPerPage());
  });

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  // Reset page when search changes (external)
  resetPagination() {
    this.currentPage.set(1);
  }
}
