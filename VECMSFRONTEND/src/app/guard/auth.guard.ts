import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public routes: Router) { }
  canActivate(
    // debugger;
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    debugger;
    if (localStorage.getItem('appkey') != null) {
      debugger;
      return true;
    }
    else {
      debugger;
      this.routes.navigate(['/login']);
      return false;
    }
  }

}
