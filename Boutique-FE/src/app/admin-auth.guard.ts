import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/authService';

@Injectable({
  providedIn:'root',
})
export class AdminAuthGuard implements CanActivate{
  constructor( private authService:AuthService, private router:Router){

  }
  canActivate():boolean {
    if(this.authService.isAdmin()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
};
