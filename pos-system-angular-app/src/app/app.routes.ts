import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { PosComponent } from "./pages/pos/pos";
import { LoginComponent } from "./pages/login/login";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: Dashboard },
  { path: "pos", component: PosComponent },
];
