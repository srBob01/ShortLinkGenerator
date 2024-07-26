import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {TokenService} from "../token/token.service";

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.token;
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
