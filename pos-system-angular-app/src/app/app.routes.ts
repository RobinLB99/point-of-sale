import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { PosComponent } from "./pages/pos/pos";
import { LoginComponent } from "./pages/login/login";
import { CashControlComponent } from "./pages/cash-control/cash-control";
import { ExpenseFormComponent } from "./pages/cash-control/components/expense-form/expense-form";
import { IncomeFormComponent } from "./pages/cash-control/components/income-form/income-form";
import { OpenCashFormComponent } from "./pages/open-cash-register/open-cash-form";
import { CreditComponent } from "./pages/credit/credit";
import { ProductsComponent } from "./pages/products/products";
import { SuppliersComponent } from "./pages/suppliers/suppliers";
import { CustomersComponent } from "./pages/customers/customers";
import { ConfiguracionComponent } from "./pages/configuracion/configuracion";
import { cashClosedGuard } from "./guards/cash-closed.guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "open-cash",
    component: OpenCashFormComponent,
    canActivate: [cashClosedGuard],
  },
  {
    path: "dashboard",
    component: Dashboard,
    // No longer protected by cashOpenGuard, features will be disabled internally
  },
  {
    path: "pos",
    component: PosComponent,
    // Eliminamos el guard para permitir carga interna y control granular
  },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "suppliers",
    component: SuppliersComponent,
  },
  {
    path: "customers",
    component: CustomersComponent,
  },
  {
    path: "settings",
    component: ConfiguracionComponent,
  },
  {
    path: "credits",
    component: CreditComponent,
  },
  {
    path: "movements",
    component: CashControlComponent,
    // No longer protected by cashOpenGuard, features will be disabled internally
    children: [
      { path: "expense", component: ExpenseFormComponent },
      { path: "income", component: IncomeFormComponent },
    ],
  },
];
