import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);
  return authService.isAuth().pipe(tap(state => {
    if(!state){
      router.navigateByUrl("/login");
    }
  }), take(1));
};
