import { Component } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { Events, MenuController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { AuthService } from './auth/auth.service';
// import { IUserInfo } from './auth/user-info.model';
// import { AuthActions, IAuthAction } from 'ionic-appauth';
// import { TokenResponse } from '@openid/appauth';
// import { ActivatedRoute } from '@angular/router';



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
    private auth: AuthService,
  ) {
    this.initializeApp();
  }
  ionViewDidEnter(){
  }
  ngOnInit(){
    let token = localStorage.getItem('token');
    if(token){
      // this.router
      // .events
      // .subscribe(
      //     (event) => {
      //         if (event instanceof NavigationStart) {
      //             if (event.url=='/landing-page') {
                    this.router.navigate(['/orders/view-orders']);
      //             }
      //             console.log(event.url)
      //         }
      //     }
      // );
    }else{
      this.router.navigate(['/auth/login']);
    }
    // this.auth.sessionCheckedOn('check login')
  }

  logout() {
    this.auth.logout().subscribe(res=>{
      this.alertPopup('Success','Successefully Logged out')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.router.navigate(['/auth/login']);
    },err=>{
      this.alertPopup('Error',JSON.stringify(err))
    });
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
      this.statusBar.overlaysWebView(true);

      this.splashScreen.hide();
    });
  }
}
