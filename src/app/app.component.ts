import { Component } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';

import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private loginService: LoginService
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
      {
        title: 'Picking',
        // url: '/picking',
        direct: 'forward',
        icon: 'briefcase',
        open: false,
        children: [
          {
            title: 'Orders to Pick',
            url: '/orders-to-pick',
            direct: 'forward',
            icon: 'walk',
          }
        ]
      },
      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      },
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  // Logout Functionality
  logout() {
    this.loginService.logout()
    .subscribe(res=>{
      this.alertPopup('Success', 'Logged out successfully.')
      this.navCtrl.navigateRoot('/');
    },err=>{
      this.alertPopup('Error', 'Error logging out!!!')
    })
  }

  // For submenu dropdown
  openCollapseSub(p) {
    console.log(p)
    p.open = !p.open;
    console.log(this.appPages)
  }

  // For alerts
  async alertPopup(title,msg){
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay',
        // handler: () => {
        //   this.submitForm = true;
        // }
      }]
    });
    await alert.present();
  }
}
