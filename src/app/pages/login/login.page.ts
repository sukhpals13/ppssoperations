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
  public submitForm: boolean;

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
    this.menuCtrl.enable(false);
    
    document.querySelectorAll('.list-form ion-item').forEach((val)=>{
      var style = document.createElement( 'style' )
      style.innerHTML = '.item-native { background: transparent !important; }'
      val.shadowRoot.appendChild(style)
    })
  }
  
  ngOnInit() {
    this.submitForm = false;
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
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
        text: 'Okay',
        handler: () => {
          this.submitForm = true;
        }
      }]
    });
    await alert.present();
  }
  goToHome() {
    console.log(this.onLoginForm);
    if(this.onLoginForm.status=='VALID'){
      let obj = {
        email: this.onLoginForm.get('email').value,
        password: this.onLoginForm.get('password').value
      }
      this.loginService.login(obj)
      .subscribe(res=>{
        console.log(res)
        this.navCtrl.navigateRoot('/home-results');
      },err=>{
        console.log(err)
        this.alertPopup('Incorrect!!!','Incorrect email or password')
        // this.navCtrl.navigateRoot('/home-results');
      })
    }else{
      this.alertPopup('Required','Email and password are required')
    }

  }

}
