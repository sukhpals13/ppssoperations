import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { AuthActions, IAuthAction } from 'ionic-appauth';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  userInfo: IUserInfo;
  action: IAuthAction;
  authenticated: boolean;

  constructor(
    public menu: MenuController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let authentic = localStorage.getItem('tokenResponse');
    if(authentic){
      this.authService.signIn().catch(error => console.error(`Sign in error: ${error}`));
    }
    this.menu.enable(false);
    this.authService.authObservable.subscribe((action) => {
      this.action = action;
      if (action.action === AuthActions.SignInSuccess || action.action === AuthActions.AuthSignInSuccess) {
        this.authenticated = true;
      } else if (action.action === AuthActions.SignOutSuccess) {
        this.authenticated = false;
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }

  signIn() {
    // this.authService.signIn().catch(error => console.error(`Sign in error: ${error}`));
    this.navCtrl.navigateForward('/auth/login');
  }

  public async getUserInfo(): Promise<void> {
    this.userInfo = await this.authService.getUserInfo<IUserInfo>();
  }

}
