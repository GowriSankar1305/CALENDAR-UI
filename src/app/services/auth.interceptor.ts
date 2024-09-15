import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { Constants } from '../types/Constants';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('---- intercepting req ----');
  const storageService = inject(SessionStorageService);
  const router = inject(Router);

  req = req.clone({
    setHeaders: {
      'Authorization': storageService.getItem(Constants.TOKEN)
    }
  });
  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401)  {
        storageService.clearSession();
        router.navigate(['/user/login']);
      }
      return throwError(() => error);
    })
  );
};
