import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SupplierService } from "../../services/supplier.service";
import { UIService } from "../../services/ui.service";
import { Supplier, DAYS_OF_WEEK } from "../../models/supplier.model";
import { PageHeaderComponent } from "../../components/page-header/page-header";

// Nuevos Componentes
import { SupplierStatsComponent } from "./components/supplier-stats/supplier-stats";
import { SupplierActionBarComponent } from "./components/supplier-action-bar/supplier-action-bar";
import { SupplierTableComponent } from "./components/supplier-table/supplier-table";
import { SupplierFormModalComponent } from "./components/supplier-form-modal/supplier-form-modal";

@Component({
  selector: "app-suppliers",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    SupplierStatsComponent,
    SupplierActionBarComponent,
    SupplierTableComponent,
    SupplierFormModalComponent,
  ],
  templateUrl: "./suppliers.html",
  styleUrl: "./suppliers.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class SuppliersComponent {
  private supplierService = inject(SupplierService);
  private uiService = inject(UIService);

  // Data from Service
  totalSuppliers = this.supplierService.totalSuppliers;
  activeSuppliers = this.supplierService.activeSuppliers;
  visitsTodayCount = this.supplierService.visitsTodayCount;
  daysOfWeek = DAYS_OF_WEEK;

  // Search and Filters
  searchTerm = signal("");
  selectedDay = signal("");

  filteredSuppliers = computed(() => {
    let list = this.supplierService.suppliers();
    const search = this.searchTerm().toLowerCase();
    const day = this.selectedDay();

    if (search) {
      list = list.filter(
        (s) =>
          s.empresa.toLowerCase().includes(search) ||
          s.vendedor.toLowerCase().includes(search),
      );
    }

    if (day) {
      list = list.filter((s) => s.diaVisita === day);
    }

    return list;
  });

  // Modal State
  isModalOpen = signal(false);
  editingSupplier = signal<Supplier | null>(null);

  openNewSupplierModal() {
    this.editingSupplier.set(null);
    this.isModalOpen.set(true);
  }

  openEditSupplierModal(supplier: Supplier) {
    this.editingSupplier.set(supplier);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveSupplier(data: any) {
    if (this.editingSupplier()) {
      this.supplierService.updateSupplier(this.editingSupplier()!.id, data);
    } else {
      this.supplierService.addSupplier(data);
    }
    this.closeModal();
  }

  deleteSupplier(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      this.supplierService.deleteSupplier(id);
    }
  }

  openWhatsApp(phone: string) {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? "593" + cleanPhone.substring(1)
      : cleanPhone;
    window.open(`https://wa.me/${formattedPhone}`, "_blank");
  }
}
