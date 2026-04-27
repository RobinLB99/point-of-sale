import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../../../../models/user.model";

@Component({
  selector: "app-user-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-table.html",
})
export class UserTableComponent {
  users = input.required<User[]>();

  onEdit = output<User>();
  onDelete = output<string>();
}
