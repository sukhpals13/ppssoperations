import { Component, OnInit, NgZone, HostBinding, Input } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  public editMode: boolean;
  public userId: string;
  public user: any;
  public loader: boolean;

  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @HostBinding('class.is-shell') get isShell() {
    return (this.user && this.user.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
    private postDetailService: PostDetailsService,
    private _Activatedroute: ActivatedRoute,
    public zone: NgZone,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.loader = false;

    this.user = {
      name: null,
      UserNumber: null,
      users: [],
      isShell: true,
      
    };


    this.editMode = false;
    this.viewUserDetails(this.user);
  }

  initializeData(){
    this.user.user = [];
    var i =0;
    while(i<6){
      var obj = {
        name: null,
        UserNumber: null,
        isShell: true
      };
      this.user.user.push(obj);
      i++;
    }
  }

  viewUserDetails(user){
    this.initializeData();
    let userId;
    this._Activatedroute.params.subscribe(it => {
      userId = it.uNumber;
      this.userId = it.uNumber;
    })
     return this.getDetailsService.getUser(userId)
     .subscribe(res =>{
        this.user = res;
     }, err => {
        console.log(err);
     });
  }


  async alertPopup(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }



  async updateUserDetail(user) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const alert = await this.alertController.create({
      header: "Are you sure ?",
      message: "Are you sure you want to update this user information ?",
      buttons: [{
        text: 'Yes',
        handler: (blah) => {
          loading.present();

          // this.addingGroup = true;
          let userId = user._id;
          let postBody = {
            email: user.email ,
            firstName: user.firstName,
            lastName: user.lastName,
            mobilePhoneNumber: user.mobilePhoneNumber,
          }
          return this.postDetailService.updateUser(userId, postBody)
            .subscribe(res => {
              console.log('Update user info response', res);
              loading.dismiss();
              this.alertPopup("Updated", 'Client User Group updated successfully');
              this.viewUserDetails(user);
              this.editMode = false;
            }, err => {
              console.log(err);
              loading.dismiss();
              this.alertPopup("Error", JSON.stringify(err.error.message));
            })
        }
      }, {
        text: 'No',
        role: 'cancel',
        handler: () => {
          // this.openSearchClient();
        }
      }]
    });
    alert.present()
  }

  // cancel user update
  cancelUserUpdate(){
    this.editMode = false;
    this.viewUserDetails(this.user);

  }

async editToggle() {
    
    this.zone.run(() => {
      let flag = true;
      // if(flag){
        if (this.editMode) {
          if(flag){
            this.editMode = false;
          }
        } else {
          this.editMode = true;
        }
    })

  }
}
