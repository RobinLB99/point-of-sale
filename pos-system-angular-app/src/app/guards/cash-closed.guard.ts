import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CashControlService } from "../services/cash-control.service";

/**
 * Guard to prevent access to the 'open-cash' route if the cash register is already open.
 */
export const cashClosedGuard: CanActivateFn = (route, state) => {
  const cashControlService = inject(CashControlService);
  const router = inject(Router);

  if (!cashControlService.isCashOpen()) {
    return true;
  }

  // If cash is already open, redirect to dashboard
  return router.createUrlTree(["/dashboard"]);
};
