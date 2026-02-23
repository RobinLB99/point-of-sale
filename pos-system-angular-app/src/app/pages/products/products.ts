import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";
import { UIService } from "../../services/ui.service";
import { Product } from "../../models/product.model";

// Nuevos Componentes
import { ProductStatsComponent } from "./components/product-stats/product-stats";
import { ProductActionBarComponent } from "./components/product-action-bar/product-action-bar";
import { ProductTableComponent } from "./components/product-table/product-table";
import { ProductFormModalComponent } from "./components/product-form-modal/product-form-modal";
import { ProductRestockModalComponent } from "./components/product-restock-modal/product-restock-modal";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    CommonModule,
    ProductStatsComponent,
    ProductActionBarComponent,
    ProductTableComponent,
    ProductFormModalComponent,
    ProductRestockModalComponent,
  ],
  templateUrl: "./products.html",
  styleUrl: "./products.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private uiService = inject(UIService);

  // UI Control
  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  // Search and Filters
  searchTerm = signal("");
  selectedCategory = signal("");

  filteredProducts = computed(() => {
    let prods = this.productService.products();
    const search = this.searchTerm().toLowerCase();
    const cat = this.selectedCategory();

    if (search) {
      prods = prods.filter((p) => p.nombre.toLowerCase().includes(search));
    }

    if (cat) {
      prods = prods.filter((p) => p.categoria === cat);
    }

    return prods;
  });

  // Modal State (Create/Edit)
  isModalOpen = signal(false);
  editingProduct = signal<Product | null>(null);

  // Restock Modal State
  isRestockModalOpen = signal(false);
  productToRestock = signal<Product | null>(null);

  openNewProductModal() {
    this.editingProduct.set(null);
    this.isModalOpen.set(true);
  }

  openEditProductModal(product: Product) {
    this.editingProduct.set(product);
    this.isModalOpen.set(true);
  }

  openRestockModal(product: Product) {
    this.productToRestock.set(product);
    this.isRestockModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isRestockModalOpen.set(false);
  }

  handleSaveProduct(productData: any) {
    if (this.editingProduct()) {
      const { stock, ...updates } = productData;
      this.productService.updateProduct(this.editingProduct()!.id, updates);
    } else {
      this.productService.addProduct(productData);
    }
    this.closeModal();
  }

  handleSaveRestock(data: { cantidad: number; precioCosto: number }) {
    if (this.productToRestock()) {
      this.productService.restockProduct(
        this.productToRestock()!.id,
        data.cantidad,
        data.precioCosto,
      );
      this.closeModal();
    }
  }

  deleteProduct(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productService.deleteProduct(id);
    }
  }
}
