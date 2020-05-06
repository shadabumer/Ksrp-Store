import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser$: Observable<any>;
  userName: string;

  constructor(private user: UsersService,
    private router: Router) { }

  ngOnInit() {
    let userId = this.user.userDetails().uid;
    this.currentUser$ = this.user.getUser(userId);
    this.userName = this.user.userDetails().displayName;
    console.log('display name:', this.userName);
  }

  logout() {
    const response = this.user.logout();
    response.then( success => {
      this.router.navigate(['login']);
    })
    .catch(error => {
      console.log('something went wrong:', error);
    })
  }

}
