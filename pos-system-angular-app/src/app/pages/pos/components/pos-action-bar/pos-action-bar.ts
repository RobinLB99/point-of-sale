import { Component, input, output, inject, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-pos-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./pos-action-bar.html",
})
export class PosActionBarComponent {
  searchQuery = input<string>("");
  selectedCategory = input<string>("all");
  categories = input<string[]>([]);
  isCashOpen = input<boolean>(true);

  onSearchChange = output<string>();
  onCategoryChange = output<string>();
  onClearCart = output<void>();
}
