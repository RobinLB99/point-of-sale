import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { PageHeaderComponent } from "../../components/page-header/page-header";
import { UserActionBarComponent } from "./components/user-action-bar/user-action-bar";
import { UserTableComponent } from "./components/user-table/user-table";
import { UserFormModalComponent } from "./components/user-form-modal/user-form-modal";
import { UserStatsComponent } from "./components/user-stats/user-stats";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    UserStatsComponent,
    UserActionBarComponent,
    UserTableComponent,
    UserFormModalComponent,
  ],
  templateUrl: "./users.html",
  styleUrl: "./users.css",
  host: {
    class: "flex flex-col flex-1 h-full overflow-hidden",
  },
})
export class UsersComponent {
  private userService = inject(UserService);

  // Data from Service
  totalUsers = computed(() => this.userService.users().length);
  activeUsers = computed(
    () => this.userService.users().filter((u) => u.status === "active").length,
  );
  adminUsers = computed(
    () => this.userService.users().filter((u) => u.role === "admin").length,
  );

  // Search and Filters
  searchTerm = signal("");
  selectedRole = signal("");

  filteredUsers = computed(() => {
    let list = this.userService.users();
    const search = this.searchTerm().toLowerCase();
    const role = this.selectedRole();

    if (search) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.username.toLowerCase().includes(search) ||
          (u.email && u.email.toLowerCase().includes(search)),
      );
    }

    if (role) {
      list = list.filter((u) => u.role === role);
    }

    return list;
  });

  // Modal State
  isModalOpen = signal(false);
  editingUser = signal<User | null>(null);

  openNewUserModal() {
    this.editingUser.set(null);
    this.isModalOpen.set(true);
  }

  openEditUserModal(user: User) {
    this.editingUser.set(user);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveUser(data: any) {
    if (this.editingUser()) {
      // Excluir la contraseña si está vacía
      const { password, ...userData } = data;
      const payload = password ? data : userData;
      this.userService.updateUser(this.editingUser()!.id, payload);
    } else {
      this.userService.addUser(data);
    }
    this.closeModal();
  }

  deleteUser(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      this.userService.deleteUser(id);
    }
  }
}
