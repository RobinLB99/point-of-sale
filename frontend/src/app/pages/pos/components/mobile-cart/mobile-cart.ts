import { Component, inject, input, output } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { CartService } from "../../../../services/cart.service";

@Component({
  selector: "app-mobile-cart",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./mobile-cart.html",
  styleUrl: "./mobile-cart.css",
})
export class MobileCartComponent {
  private cartService = inject(CartService);

  isOpen = input<boolean>(false);
  toggle = output<void>();
  checkout = output<void>();

  cartItems = this.cartService.items;
  cartTotal = this.cartService.total;
  cartItemsCount = this.cartService.itemsCount;

  updateQuantity(id: string, delta: number) {
    this.cartService.updateQuantity(id, delta);
  }
}
