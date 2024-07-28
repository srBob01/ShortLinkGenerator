import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../token/token.service";
import {inject} from "@angular/core";

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isTokenNotValid() || !tokenService.userRoles.includes('ADMIN')) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
