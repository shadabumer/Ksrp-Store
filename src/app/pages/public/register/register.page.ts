import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted: boolean = false;
  isPasswordMatch: boolean = true;
  newUserId: string = "";

  constructor(private users: UsersService,
    private toastController: ToastController,
    private router: Router,) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  confirmPassword() {
    if(this.f.password.value !== this.f.confirmPassword.value) {
      this.isPasswordMatch = false;
    } else {
      this.isPasswordMatch = true;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const newUser = this.onCreateAccount();

    newUser.then(async newUserData => {
      this.newUserId = newUserData.user.uid;
      await this.onRegisterUser();
      this.registerForm.reset();

      this.displayToast('Successfully registered, Please Login', 'Authentication-success');
      this.router.navigate(['login']);

      console.log('signup success: ', newUserData);
      this.isSubmitted = false;

    }).catch(error => {
      this.displayToast(error.message, 'Authentication-error');
      console.log('signup failed:', error);
      this.isSubmitted = false;
    })

  }

  onCreateAccount() {
    const newuser = this.users.createAccount(this.f.email.value, this.f.password.value);
    return newuser
  }

  onRegisterUser() {
    let newUser: User = {
      id: this.newUserId,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      mobile: this.f.mobile.value,
      imageUrl: 'https://avatars.dicebear.com/v2/male/john.svg',
    }
    console.log('new user details:', newUser);

    return this.users.registerUser(newUser);
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
