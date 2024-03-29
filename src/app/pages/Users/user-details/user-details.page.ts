import { Component, OnInit, NgZone, HostBinding, Input } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  public userId: string;
  public user: any;
  public loader: boolean;
  public addRankValue: string;
  public addAssignmentValue: string;
  public addRoleValue: string;
  public clientData: any;
  public clientId: string;
  public deviceWidth: any;
  public mobileMode: boolean;
  public userInfoEditMode: boolean;
  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public show : string;
  public editing: boolean;
  public clientUserGroups: any;

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
    public breakpointObserver: BreakpointObserver,

  ) { }

  ngOnInit() {
    this.loader = false;
    this.addRankValue = '';
    this.addAssignmentValue = '';
    this.addRoleValue = '';

    this.user = {

      user: {
        name: null,
        orgName: null,
        UserNumber: null,
        isShell: true,
        clientLinks: [{
          ranks: []
        }],
      },
    };


    this.userInfoEditMode = false;
    this.viewUserDetails(this.user);
    this.show = '';
    this.editing = false;
    this.mobileMode = false;
    this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.mobileMode = true;
      } else {
        this.mobileMode = false;
      }
    });

  }

  initializeData() {
    this.user.user = [];
    var i = 0;
    while (i < 6) {
      var obj = {
        name: null,
        UserNumber: null,
        orgName: null,
        clientLinks: [{
          ranks: []
        }],
        isShell: true,
      };
      this.user.user.push(obj);
      i++;
    }
  }

  viewUserDetails(user) {
    this.initializeData();
    let userId;
    this._Activatedroute.params.subscribe(it => {
      userId = it.uNumber;
      this.userId = it.uNumber;
    })
    return this.getDetailsService.getUser(userId)
      .subscribe(res => {
        this.user = res.user;
        this.user.expandedUserRoles = this.user.expandedUserRoles.map(val => {
          val.accessRights = val.accessRights.map(v => {
            v.nameToShow = v.name.split('_').join(' ');
            return v
          })
          // console.log(val);
          return val
        });
        // console.log('response user', res.user.clientLinks[0].clientId);
        this.clientId = res.user.clientLinks[0].clientId;
        this.getClientData();
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

  // get client 
  getClientData() {
    return this.getDetailsService.getClient(this.clientId)
      .subscribe(res => {
        console.log('client data response', res);
        this.clientData = res.client;
        this.getClientUserGroups(res.client._id);
      }, err => {
        console.log(err);
      }

      )
  }

  getClientUserGroups(id){
    console.log(id,'lahsdfblihsadfglfliuasd');
    return this.getDetailsService.getClientUserGroups(id)
    .subscribe(res=>{
      console.log(res);
      this.clientUserGroups = res.groups;
    },err=>{
      console.log(err);
    })
  }
  // user info
  async saveUserInfo(user) {
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
          console.log('userrrrrrrrrrrrrrrr', user);
          let userId = user._id;
          let postBody = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobilePhoneNumber: user.mobilePhoneNumber,
          }
          return this.postDetailService.updateUser(userId, postBody)
            .subscribe(res => {
              console.log('Update user info response', res);
              loading.dismiss();
              this.alertPopup("Updated", 'User information updated successfully');
              this.viewUserDetails(user);
              this.userInfoEditMode = false;
              this.showEdit('');
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
        }
      }]
    });
    alert.present()
  }
  cancelUserInfo() {
    this.viewUserDetails(this.user);
    this.showEdit('userInfo');
    this.userInfoEditMode = false;
  }

  async editToggleUserInfo() {

    this.zone.run(() => {
      // let flag = true;
      if (this.userInfoEditMode) {
        // if (flag) {
          this.userInfoEditMode = false;
          this.showEdit('userInfo');
        // }
      } else {
        this.userInfoEditMode = true;
        this.showEdit('userInfo');
      }
    })

  };

  async showEdit(sec){
    this.editing = !this.editing;
    this.show = sec;
  }

}
