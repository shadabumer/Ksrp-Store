import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser$: Observable<any>;
  userName: string;

  constructor(private user: UsersService) { }

  ngOnInit() {
    let userId = this.user.userDetails().uid;
    this.currentUser$ = this.user.getUser(userId);
    this.userName = this.user.userDetails().displayName;
    console.log('display name:', this.userName);
  }

}
