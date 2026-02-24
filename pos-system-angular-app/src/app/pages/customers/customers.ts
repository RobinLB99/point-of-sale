import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomerService } from "../../services/customer.service";
import { UIService } from "../../services/ui.service";
import { Customer } from "../../models/customer.model";

// Nuevos Componentes
import { CustomerStatsComponent } from "./components/customer-stats/customer-stats";
import { CustomerActionBarComponent } from "./components/customer-action-bar/customer-action-bar";
import { CustomerTableComponent } from "./components/customer-table/customer-table";
import { CustomerFormModalComponent } from "./components/customer-form-modal/customer-form-modal";

@Component({
  selector: "app-customers",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomerStatsComponent,
    CustomerActionBarComponent,
    CustomerTableComponent,
    CustomerFormModalComponent,
  ],
  templateUrl: "./customers.html",
  styleUrl: "./customers.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class CustomersComponent {
  private customerService = inject(CustomerService);
  private uiService = inject(UIService);

  // UI State
  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  // Data from Service
  totalCustomers = this.customerService.totalCustomers;
  customersWithDebtCount = this.customerService.customersWithDebtCount;
  customersAtLimitCount = this.customerService.customersAtLimitCount;

  // Search and Filters
  searchTerm = signal("");
  selectedStatus = signal("");

  filteredCustomers = computed(() => {
    let list = this.customerService.customers();
    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();

    if (search) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.phone.includes(search) ||
          (c.cedula && c.cedula.includes(search)),
      );
    }

    if (status) {
      list = list.filter((c) => c.status === status);
    }

    return list;
  });

  // Modal State
  isModalOpen = signal(false);
  editingCustomer = signal<Customer | null>(null);

  openNewCustomerModal() {
    this.editingCustomer.set(null);
    this.isModalOpen.set(true);
  }

  openEditCustomerModal(customer: Customer) {
    this.editingCustomer.set(customer);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveCustomer(data: any) {
    if (this.editingCustomer()) {
      this.customerService.updateCustomer(this.editingCustomer()!.id, data);
    } else {
      this.customerService.addCustomer(data);
    }
    this.closeModal();
  }

  deleteCustomer(id: string) {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este cliente? Se borrará todo su historial de crédito.",
      )
    ) {
      this.customerService.deleteCustomer(id);
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
