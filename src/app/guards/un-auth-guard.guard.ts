import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../shared/users.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate  {
  
  constructor(private user: UsersService) {}
  
  canActivate() {
    return !this.user.isAuthenticated();
  }
}
