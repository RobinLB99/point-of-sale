import { Component, input, output, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { CartService } from "../../../../services/cart.service";

@Component({
  selector: "app-product-grid",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-grid.html",
})
export class ProductGridComponent {
  private cartService = inject(CartService);

  products = input<any[]>([]);
  isCashOpen = input<boolean>(true);
  onAddToCart = output<any>();

  getStockRemaining(p: any): number {
    return this.cartService.getStockRemaining(p.id, p.stock);
  }
}
