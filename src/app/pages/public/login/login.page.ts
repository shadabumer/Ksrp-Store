import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    public user: UsersService,
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const user = this.user.login(this.f.email.value, this.f.password.value);

    user.then( userData => {
      console.log('login success:', userData.user);
      this.isSubmitted = false;
      this.displayToast('login success', 'Authentication-success');
      this.router.navigate(['tabs', 'tab1']);
    }).catch(error => {
      console.log('login failure:', error);
      this.isSubmitted = false;
      this.displayToast(error.message, 'Authentication-error');
    });

    this.loginForm.reset();
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

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async (emailLink) => {
            console.log('email entered:', emailLink.email);
            this.user.forgotPassword(emailLink.email);
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastController.create({
                showCloseButton: true,
                message: 'Email was sent successfully.',
                duration: 3000,
                position: 'bottom',
                cssClass: 'Authentication-success'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
