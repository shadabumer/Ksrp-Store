import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UsersService } from './shared/users.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { ForgotPasswordPage } from './pages/public/forgot-password/forgot-password.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationService: UsersService,
    private router: Router,
    private deeplinks: Deeplinks
  ) {
    this.initializeApp();

    this.deeplinks.route({
      '/forgot-password': ForgotPasswordPage
    }).subscribe(match => {
      this.router.navigate(['forgot-password'], { queryParams : match.$args })
      console.log('routes matched:', match);
    }, nomatch => {
      this.router.navigate(['']);
      console.error('Got a deeplink that didn\'t match', nomatch);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#2e256d');
      this.statusBar.styleLightContent();

      // this.authenticationService.checkToken();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
    });
  }

  logout() {
    const response = this.authenticationService.logout();
    response.then( success => {
      this.router.navigate(['login']);
    })
    .catch(error => {
      console.log('something went wrong:', error);
    })
  }
}
