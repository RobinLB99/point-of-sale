import { Component, inject } from "@angular/core";
import { UIService } from "../../services/ui.service";
import { CashControlService } from "../../services/cash-control.service";
import { PageHeaderComponent } from "../../components/page-header/page-header";
import { CardGroup } from "./components/card-group/card-group";
import { TransactionTable } from "./components/transaction-table/transaction-table";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [PageHeaderComponent, CardGroup, TransactionTable],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard {
  private uiService = inject(UIService);
  cashControlService = inject(CashControlService);

  isCashOpen = this.cashControlService.isCashOpen;
}
