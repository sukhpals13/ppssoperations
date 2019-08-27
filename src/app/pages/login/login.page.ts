import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  public loginSubmit: boolean;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {  }

  ionViewWillEnter() {
    this.loginSubmit = false;
    console.log(this.loginSubmit);
    this.menuCtrl.enable(false);
    // Check if the localstorage value of the users are saved for auto save
    if(localStorage.getItem('email')){
      this.onLoginForm.controls['email'].setValue(localStorage.getItem('email'))
      this.onLoginForm.controls['password'].setValue(localStorage.getItem('password'))
      this.onLoginForm.controls['rememberMe'].setValue(Boolean(localStorage.getItem('rememberMe')))
    }
    document.querySelectorAll('.list-form ion-item').forEach((val)=>{
      var style = document.createElement( 'style' )
      style.innerHTML = '.item-native { background: transparent !important; }'
      val.shadowRoot.appendChild(style)
    })
  }
  
  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'rememberMe': [null,null]
    });
  }
  // NO NEED FOR THESE FUNCTIONS FOR NOW
  // async forgotPass() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Forgot Password?',
  //     message: 'Enter you email address to send a reset link password.',
  //     inputs: [
  //       {
  //         name: 'email',
  //         type: 'email',
  //         placeholder: 'Email'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Confirm',
  //         handler: async () => {
  //           const loader = await this.loadingCtrl.create({
  //             duration: 2000
  //           });
  //
  //           loader.present();
  //           loader.onWillDismiss().then(async l => {
  //             const toast = await this.toastCtrl.create({
  //               showCloseButton: true,
  //               message: 'Email was sended successfully.',
  //               duration: 3000,
  //               position: 'bottom'
  //             });
  //
  //             toast.present();
  //           });
  //         }
  //       }
  //     ]
  //   });
  //
  //   await alert.present();
  // }
  //
  // // // //
  // goToRegister() {
  //   this.navCtrl.navigateRoot('/register');
  // }

  /*************** CHECK ON LOGIN ****************/
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
  goToHome() {

    if(this.onLoginForm.status=='VALID'){
      let obj = {
        email: this.onLoginForm.get('email').value,
        password: this.onLoginForm.get('password').value
      }
      // For the loader icon
      this.loginSubmit = true;

      // Login service called
      this.loginService.login(obj)
      .subscribe(res=>{
        this.loginSubmit = false;
        
        // For auto save if the user has clicked on remember me
        if(this.onLoginForm.get('rememberMe').value){
          localStorage.setItem('email',obj.email);
          localStorage.setItem('password',obj.password);
          localStorage.setItem('rememberMe',this.onLoginForm.get('rememberMe').value);
        }else{
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        this.navCtrl.navigateRoot('/home-results');
      },err=>{
        console.log(err)
        this.loginSubmit = false;
        this.alertPopup('500!!!',JSON.stringify(err))
      })
    }else{
      this.alertPopup('Required','Email and password are required')
    }

  }

}
