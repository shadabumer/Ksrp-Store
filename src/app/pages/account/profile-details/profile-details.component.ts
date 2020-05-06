import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';
import { UsersService } from 'src/app/shared/users.service';
import { UploadImageComponent } from './upload-image/upload-image.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  currentUser$: Observable<any>;
  userId: string;
  currentUser: User;
  subscription: Subscription;

  constructor(private router: Router,
    private modalController: ModalController,
    private user: UsersService) { }

  ngOnInit() {
    this.userId = this.user.userDetails().uid;
    this.currentUser$ = this.user.getUser(this.userId);

    this.subscription = this.user.getUser(this.userId).subscribe((data: User) => {
      this.currentUser = data;
    })
  }

  async editProfile() {
    const modal = await this.modalController.create({
      component: EditProfileComponent,
      componentProps: {
        currentUser : { ...this.currentUser }
      },
      cssClass: 'edit-profile'
    });
    return await modal.present();
  }

  async updateProfilePic() {
    const modal = await this.modalController.create({
      component: UploadImageComponent,
      componentProps: {
        currentUser : { ...this.currentUser }
      },
    });
    return await modal.present();
  }

  goHome() {
    this.router.navigate(['tabs', 'tab1']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
