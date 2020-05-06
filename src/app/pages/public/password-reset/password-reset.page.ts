import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  passwordForm: FormGroup;
  isSubmitted: boolean = false;
  isPasswordMatch: boolean = true;
  currentUserEmail: string;

  constructor(
    private userService: UsersService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.currentUserEmail = this.userService.userDetails().email;
    console.log('current user email:', this.currentUserEmail);
  }

  // convenience getter for easy access to form fields
  get f() { return this.passwordForm.controls; }

  passwordMatch() {
    if(this.f.newPassword.value !== this.f.confirmPassword.value) {
      this.isPasswordMatch = false;
    } else {
      this.isPasswordMatch = true;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.invalid) return;

   this.onReauthenticateUser();
   this.onUpdatePassword();


  }

  onReauthenticateUser() {
    this.userService.reauthenticateUser(this.currentUserEmail, this.f.oldPassword.value)
    .then(success => {
      console.log('user reauthenticated successfully:', success);
      this.onUpdatePassword();
    })
    .catch(error => {
      console.log('user reauthentication failed:', error);
      this.displayToast('user reauthentication failed, try again!', 'Authentication-error');

    })
  }

  onUpdatePassword() {
    this.userService.resetPassword(this.f.newPassword.value)
    .then(success => {
      console.log('password updated successfully:', success);
      this.displayToast('Password changed successfully', 'Authentication-success');
      this.passwordForm.reset();
    })
    .catch(error => {
      console.log('password not updated:', error);
      this.displayToast('Password update failed', 'Authentication-error');
    })
  }

  async displayToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message,
      cssClass,
      showCloseButton: true,
      duration: 3000,
    });
    toast.present();
  }


}
