import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  currentUser: User;

  constructor(private user: UsersService, private navParams: NavParams, private modalCtrl: ModalController) {
    this.currentUser = this.navParams.get('currentUser');
   }

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName),
      lastName: new FormControl(this.currentUser.lastName),
      mobile: new FormControl(this.currentUser.mobile),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit() {
    let editUser: User = {
      id: this.user.userDetails().uid,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      mobile: this.f.mobile.value,
      email: this.currentUser.email,
      imageUrl: this.currentUser.imageUrl,
    }
    console.log('form submitted:', editUser);
    this.user.updateUser(editUser);
    this.modalCtrl.dismiss({ 'dismissed': true });
  }

  ngOnDestroy() {
  }

}
