import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../shared/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(public user: UsersService) {}
 
  canActivate(): boolean {
    return this.user.isAuthenticated();
  }
}
