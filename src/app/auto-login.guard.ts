import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './core/services/firebase.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.firebaseService.isLogin().pipe(
      tap(isLogin => {
        if (isLogin) { this.router.navigate(['/backend/issues']) }
      }),
      map(canActivate => {
        return !canActivate;
      })
    );
  }

}

