import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user.model';
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
    private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      // validators: MustMatch('password', 'confirmPassword')
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

    this.onCreateAccount();

    // this.registerForm.reset();
    this.isSubmitted = false;
  }

  onCreateAccount() {
    const newuser = this.users.createAccount(this.f.email.value, this.f.password.value)
    .then(newUserData => { 
      console.log('new user data:', newUserData.user.uid);
      this.newUserId = newUserData.user.uid;

      this.onRegisterUser();

    });
    console.log('new user:', newuser);
  }

  onRegisterUser() {
    let newUser: User = {
      id: this.newUserId,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      mobile: this.f.mobile.value
    }
    console.log('new user details:', newUser);

    this.users.registerUser(newUser);
    this.router.navigate(['login']);
  }

}
