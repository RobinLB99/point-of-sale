import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { UserService } from "../services/user.service";

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuth = userService.isLoggedIn();
  console.log('[AuthGuard] Is Authenticated:', isAuth);

  if (isAuth) {
    return true;
  }

  console.warn('[AuthGuard] Access denied. Redirecting to login...');
  router.navigate(["/login"]);
  return false;
};

export const guestGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuth = userService.isLoggedIn();
  console.log('[GuestGuard] Is Authenticated:', isAuth);

  if (!isAuth) {
    return true;
  }

  console.log('[GuestGuard] User already logged in. Redirecting to dashboard...');
  router.navigate(["/dashboard"]);
  return false;
};
