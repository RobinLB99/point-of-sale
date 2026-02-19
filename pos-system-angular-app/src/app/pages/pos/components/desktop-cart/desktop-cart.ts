import { Component, inject, output } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { CartService } from "../../../../services/cart.service";

@Component({
  selector: "app-desktop-cart",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./desktop-cart.html",
  styleUrl: "./desktop-cart.css",
})
export class DesktopCartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.items;
  cartTotal = this.cartService.total;
  cartSubtotal = this.cartService.subtotal;

  checkout = output<void>();

  updateQuantity(id: string, delta: number) {
    this.cartService.updateQuantity(id, delta);
  }
}
