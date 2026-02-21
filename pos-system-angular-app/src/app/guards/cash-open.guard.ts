import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { CashControlService } from "../services/cash-control.service";

export const cashOpenGuard: CanActivateFn = (route, state) => {
  const cashControlService = inject(CashControlService);
  const router = inject(Router);

  if (cashControlService.isCashOpen()) {
    return true;
  } else {
    // Redirect to the open cash register page with returnUrl
    return router.createUrlTree(["/open-cash"], {
      queryParams: { returnUrl: state.url },
    });
  }
};
