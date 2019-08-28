import { Component, OnInit } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';

import { LoginService } from './services/login/login.service';
import { GetSetService } from './services/getSet/get-set.service';
import { User } from './interfaces/user'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public user: User;
  public loggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private getSet: GetSetService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
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
        title: 'Barcode Scanner',
        url: '/bar-code-scanner',
        direct: 'forward',
        icon: 'barcode'
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

  ngOnInit(){
    this.loggedIn = false;
    this.checkSession();
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
      this.getSet.removeItem('user');
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
      }]
    });
    await alert.present();
  }

  // Check if there's already a session of the user
  checkSession() {
    if(this.getSet.getItem('user')){
      this.user = this.getSet.getUser();
      this.loginService.sessionCheck()
      .subscribe(res=>{
        this.loggedIn = true;
        this.getSet.setItem('user',res.user);
        this.navCtrl.navigateRoot('/home-results');
      },err=>{
        this.loggedIn = false;
        this.user = this.getSet.unsetUser();
        this.getSet.removeItem('user');
        this.navCtrl.navigateRoot('/');
      })
    }else{
      this.loggedIn = false;
      this.user = this.getSet.unsetUser();
      this.navCtrl.navigateRoot('/');
    }
  }
  componentAdded(e){
    if(this.getSet.getUser()){
      this.user = this.getSet.getUser()
    }else{
      this.user = this.getSet.unsetUser()
    }
  }
}
