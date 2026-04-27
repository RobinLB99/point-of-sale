import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CashControlService } from "../services/cash-control.service";

export const cashStatusGuard: CanActivateFn = (route, state) => {
  const cashControlService = inject(CashControlService);
  const router = inject(Router);

  if (cashControlService.isCashOpen()) {
    return true;
  } else {
    // Redirect to the open cash register page if cash is not open with returnUrl
    return router.createUrlTree(["/open-cash"], {
      queryParams: { returnUrl: state.url },
    });
  }
};
