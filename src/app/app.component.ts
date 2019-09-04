import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ]
})
export class AppComponent {
  appPages = [
    {
      title: 'Categories',
      url: '/app/categories',
      icon: './assets/sample-icons/side-menu/categories.svg'
    },
    {
      title: 'Profile',
      url: '/app/user',
      icon: './assets/sample-icons/side-menu/profile.svg'
    },
    {
      title: 'Contact Card',
      url: '/contact-card',
      icon: './assets/sample-icons/side-menu/contact-card.svg'
    },
    {
      title: 'Notifications',
      url: '/app/notifications',
      icon: './assets/sample-icons/side-menu/notifications.svg'
    }
  ];
  accountPages = [
    {
      title: 'Log In',
      url: '/auth/login',
      icon: './assets/sample-icons/side-menu/login.svg'
    },
    {
      title: 'Sign Up',
      url: '/auth/signup',
      icon: './assets/sample-icons/side-menu/signup.svg'
    },
    {
      title: 'Tutorial',
      url: '/walkthrough',
      icon: './assets/sample-icons/side-menu/tutorial.svg'
    },
    {
      title: 'Getting Started',
      url: '/getting-started',
      icon: './assets/sample-icons/side-menu/getting-started.svg'
    },
    {
      title: '404 page',
      url: '/page-not-found',
      icon: './assets/sample-icons/side-menu/warning.svg'
    }
  ];
  orderPages = [
    {
      title: 'Orders To Pick',
      url: '/orders/to-pick',
      icon: 'walk'
    },
    {
      title: 'View Orders',
      url: '/orders/view-orders',
      icon: 'list-box'
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertCtrl: AlertController,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.auth.sessionCheckedOn('check login')
  }

  logout() {
    this.auth.logout()
      .subscribe(res => {
        console.log(res);
        this.alertPopup('Logged Out', 'Logged out successfully!!!');
        localStorage.removeItem('user')
        this.router.navigate(['auth/login']);
      }, err => {
        console.log(err);
        this.alertPopup('Cannot logout', 'Error logging out!!!');
      })
  }

  async alertPopup(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
