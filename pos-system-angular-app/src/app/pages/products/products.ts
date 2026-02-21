import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { UIService } from "../../services/ui.service";
import { Product, getProductStatus } from "../../models/product.model";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, ReactiveFormsModule],
  templateUrl: "./products.html",
  styleUrl: "./products.css",
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private uiService = inject(UIService);
  private fb = inject(FormBuilder);

  // UI Control
  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  // Stats from service
  totalProducts = this.productService.totalProducts;
  stockAlerts = this.productService.stockAlerts;
  inventoryValue = this.productService.inventoryValue;
  mainCategory = this.productService.mainCategory;

  // Search and Filters
  searchTerm = signal("");
  selectedCategory = signal("");

  categories = computed(() => {
    const cats = this.productService.products().map((p) => p.categoria);
    return [...new Set(cats)];
  });

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

  // Main Modal State (Create/Edit)
  isModalOpen = signal(false);
  editingProduct = signal<Product | null>(null);
  productForm: FormGroup;

  // Restock Modal State
  isRestockModalOpen = signal(false);
  productToRestock = signal<Product | null>(null);
  restockForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      nombre: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      precioCosto: [0, [Validators.required, Validators.min(0)]],
      precioVenta: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMinimo: [0, [Validators.required, Validators.min(0)]],
    });

    this.restockForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(0.01)]],
      precioCosto: [0, [Validators.required, Validators.min(0)]],
    });
  }

  openNewProductModal() {
    this.editingProduct.set(null);
    this.productForm.reset({
      nombre: "",
      categoria: "",
      precioCosto: 0,
      precioVenta: 0,
      stock: 0,
      stockMinimo: 0,
    });
    this.productForm.get("stock")?.enable();
    this.isModalOpen.set(true);
  }

  openEditProductModal(product: Product) {
    this.editingProduct.set(product);
    this.productForm.patchValue(product);
    this.productForm.get("stock")?.disable();
    this.isModalOpen.set(true);
  }

  openRestockModal(product: Product) {
    this.productToRestock.set(product);
    this.restockForm.reset({
      cantidad: 1,
      precioCosto: product.precioCosto,
    });
    this.isRestockModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isRestockModalOpen.set(false);
  }

  saveProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.getRawValue();
      if (this.editingProduct()) {
        const { stock, ...updates } = productData;
        this.productService.updateProduct(this.editingProduct()!.id, updates);
      } else {
        this.productService.addProduct(productData);
      }
      this.closeModal();
    }
  }

  saveRestock() {
    if (this.restockForm.valid && this.productToRestock()) {
      const { cantidad, precioCosto } = this.restockForm.value;
      this.productService.restockProduct(
        this.productToRestock()!.id,
        cantidad,
        precioCosto,
      );
      this.closeModal();
    }
  }

  deleteProduct(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.productService.deleteProduct(id);
    }
  }

  getStatus(stock: number, stockMinimo: number) {
    return getProductStatus(stock, stockMinimo);
  }

  getStatusClass(status: string) {
    switch (status) {
      case "Óptimo":
        return "bg-green-100 text-green-700 border-green-200";
      case "Bajo":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Agotado":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }
}
