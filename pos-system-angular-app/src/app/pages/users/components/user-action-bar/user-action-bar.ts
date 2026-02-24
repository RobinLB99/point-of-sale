import { Component, model, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user-action-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./user-action-bar.html",
})
export class UserActionBarComponent {
  searchTerm = model<string>("");
  selectedRole = model<string>("");

  onAddUser = output<void>();
}
