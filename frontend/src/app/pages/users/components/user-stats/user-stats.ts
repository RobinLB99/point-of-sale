import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-stats",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-stats.html",
})
export class UserStatsComponent {
  totalUsers = input.required<number>();
  activeUsers = input.required<number>();
  adminUsers = input.required<number>();
}
