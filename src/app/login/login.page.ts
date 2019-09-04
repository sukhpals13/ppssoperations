import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    public alertCtrl: AlertController,
    private auth: AuthService
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      'remember': new FormControl()
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
    let remUser = localStorage.getItem('remUser');
    if(remUser){
      this.loginForm.controls['email'].setValue(JSON.parse(remUser).email);
      this.loginForm.controls['password'].setValue(JSON.parse(remUser).password);
      this.loginForm.controls['remember'].setValue(true);
    }
    this.auth.sessionCheckedOn('login');
  }

  async alertPopup(title,msg){
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }

  doLogin(): void {
    let user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    console.log(user)
    // this.alertPopup('User Details',JSON.stringify(user))
    this.auth.login(user)
    .subscribe(res=>{
      console.log(res);
      localStorage.setItem('user',JSON.stringify(res.user));
      if(this.loginForm.get('remember').value){
        localStorage.setItem('remUser',JSON.stringify(user));
      }else{
        localStorage.removeItem('remUser');
      }
      this.router.navigate(['app/categories']);
    },err=>{
      this.alertPopup('Error logging in!!!',JSON.stringify(err))
    })
  }

  goToForgotPassword(): void {
    console.log('redirect to forgot-password page');
  }

  doFacebookLogin(): void {
    console.log('facebook login');
    this.router.navigate(['app/categories']);
  }

  doGoogleLogin(): void {
    console.log('google login');
    this.router.navigate(['app/categories']);
  }

  doTwitterLogin(): void {
    console.log('twitter login');
    this.router.navigate(['app/categories']);
  }
}