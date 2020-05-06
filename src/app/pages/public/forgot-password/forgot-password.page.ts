import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  passwordForm: FormGroup;
  isSubmitted: boolean = false;
  isPasswordMatch: boolean = true;

  code: string;
  actionMode: string;
  
  constructor(
    private userService: UsersService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.code = this.route.snapshot.queryParams['oobCode'];
    this.actionMode = this.route.queryParams['mode'];

    console.log('mode: ', this.actionMode, 'oobCode:', this.code);
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
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

    this.userService.confirmPasswordReset(this.code, this.f.confirmPassword.value)
    .then( success => {
      console.log('Password has been reset successfully:', success);
      this.passwordForm.reset();
      this.displayToast('Password has been reset successfully', 'Authentication-success');
      this.router.navigate(['login']);
    })
    .catch( error => {
      console.log('Password reset failed:', error);
      this.displayToast(error.message, 'Authentication-error');
    })

  }

  goToLogin() {
    this.router.navigate(['login']);
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
