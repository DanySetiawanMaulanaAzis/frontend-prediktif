import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Belum Login
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Ambil Role dari Route
  const roles = route.data?.['roles'] as string[] | undefined;
  
  // Jika route tidak mendefinisikan role, cukup pastikan user sudah login
  if (!roles || roles.length === 0) {
    return true;
  }

  // Validasi Role
  if (authService.hasAnyRole(roles)) {
    return true;
  }

  // Tidak memiliki hak akses, Redirect ke halaman default sesuai role
  router.navigate([authService.getDefaultRoute()]);
  return true;
};
