import { Component } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { Events, MenuController, Platform, AlertController, NavController } from '@ionic/angular';
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
  // list of pages to show in the menu
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
      icon: 'walk',
    },
    {
      title: 'View Orders',
      url: '/orders/view-orders',
      icon: 'list-box',
    },
  ];
  clientPages = [
    {
      title: 'Search Client',
      url: '/clients/search-client',
      icon: 'eye',
    },
    {
      title: 'Create Client',
      url: '/clients/create',
      icon: 'list-box',
    },  
  ];
  userPages = [
    {
      title: 'Search User',
      url: '/users/search-user',
      icon: 'eye'
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertCtrl: AlertController,
    private auth: AuthService,
    public navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  ionViewDidEnter(){
    
  }

  ngOnInit(){
    // check for token on client side
    // if(token){
      this.router
      .events
      .subscribe(
        (event) => {
          if (event instanceof NavigationStart) {
                let token = localStorage.getItem('token'),
                user = localStorage.getItem('user');
                if(user){
                  var userString = JSON.parse(user);
                  if(userString.roles.includes('SUPER')){
                    this.orderPages = [
                      {
                        title: 'Orders To Pick',
                        url: '/orders/to-pick',
                        icon: 'walk',
                      },
                      {
                        title: 'View Orders',
                        url: '/orders/view-orders',
                        icon: 'list-box',
                      },
                    ] 
                  }else if(userString.roles.includes('VIEW_ORDERS')){
                    this.orderPages = [
                      {
                        title: 'View Orders',
                        url: '/orders/view-orders',
                        icon: 'list-box',
                      },
                    ] 
                  }else if(userString.roles.includes('ORDER_PICKER')){
                    this.orderPages = [
                      {
                        title: 'Orders To Pick',
                        url: '/orders/to-pick',
                        icon: 'walk',
                      },
                    ]
                  }
                }
                console.log(event.url);
                  if (event.url=='/landing-page'||event.url=='/auth/login') {
                    if(token)
                      this.router.navigate(['/orders/view-orders']);
                  }else{
                    if(!token)
                      this.router.navigate(['/auth/login']);
                  }
              }
          }
      );
      // let token = localStorage.getItem('token');
      // if(token&&this.router.url=="/landing-page"){
      //   this.router.navigate(['/orders/view-orders'])
      // }
    // }else{
    //   this.router.navigate(['/auth/login']);
    // }
  }

  // logout function
  logout() {
    this.auth.logout().subscribe(res=>{
      this.alertPopup('Success','Successfully Logged out')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // this.router.navigate(['/auth/login']);
      console.log('logout called')
      this.navCtrl.navigateRoot(['/auth/login'])
    },err=>{
      this.alertPopup('Error',JSON.stringify(err))
    });
  }

  // showing the alert popup
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

  // functions after the loading screen loads in the app
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent()
      this.splashScreen.hide();
    });
  }

}
