import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SupplierService } from "../../services/supplier.service";
import { UIService } from "../../services/ui.service";
import { Supplier, DAYS_OF_WEEK } from "../../models/supplier.model";

@Component({
  selector: "app-suppliers",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./suppliers.html",
  styleUrl: "./suppliers.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class SuppliersComponent {
  private supplierService = inject(SupplierService);
  private uiService = inject(UIService);
  private fb = inject(FormBuilder);

  // UI State
  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

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
  supplierForm: FormGroup;

  constructor() {
    this.supplierForm = this.fb.group({
      empresa: ["", [Validators.required]],
      vendedor: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      diaVisita: ["Lunes", [Validators.required]],
      activo: [true],
    });
  }

  openNewSupplierModal() {
    this.editingSupplier.set(null);
    this.supplierForm.reset({
      empresa: "",
      vendedor: "",
      telefono: "",
      diaVisita: "Lunes",
      activo: true,
    });
    this.isModalOpen.set(true);
  }

  openEditSupplierModal(supplier: Supplier) {
    this.editingSupplier.set(supplier);
    this.supplierForm.patchValue(supplier);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveSupplier() {
    if (this.supplierForm.valid) {
      const data = this.supplierForm.value;
      if (this.editingSupplier()) {
        this.supplierService.updateSupplier(this.editingSupplier()!.id, data);
      } else {
        this.supplierService.addSupplier(data);
      }
      this.closeModal();
    }
  }

  deleteSupplier(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
      this.supplierService.deleteSupplier(id);
    }
  }

  openWhatsApp(phone: string) {
    // Limpiar el número de caracteres no numéricos
    const cleanPhone = phone.replace(/\D/g, "");
    // Asumimos código de país si no lo tiene, o simplemente usamos el número
    // Para Ecuador suele ser 593
    const formattedPhone = cleanPhone.startsWith("0")
      ? "593" + cleanPhone.substring(1)
      : cleanPhone;
    window.open(`https://wa.me/${formattedPhone}`, "_blank");
  }
}
