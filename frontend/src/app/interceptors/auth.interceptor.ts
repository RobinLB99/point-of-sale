import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { UserService } from "../services/user.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const userService = inject(UserService);

  // Si es login, BYPASS TOTAL. No tocamos la petición.
  if (req.url.includes('/auth/login')) {
    console.log('[Interceptor] Login detectado, bypass directo.');
    return next(req);
  }

  const token = userService.token();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo limpiamos si el error es 401/403 y NO es el login
      if (error.status === 401 || error.status === 403) {
        console.warn("[Interceptor] Error de autorización en:", req.url);
        userService.logout();
        router.navigate(["/login"]);
      }
      return throwError(() => error);
    }),
  );
};
