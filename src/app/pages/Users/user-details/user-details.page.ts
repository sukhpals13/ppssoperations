import { Component, OnInit, NgZone, HostBinding, Input } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {BreakpointObserver} from '@angular/cdk/layout';

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
  public addRankValue: string;
  public addAssignmentValue: string;
  public addRoleValue: string;
  public clientData: any;
  public clientId: string;
  public deviceWidth: any;
  public mobileMode: boolean;

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
        UserNumber: null,
        isShell: true,
        clientLinks: [{
          ranks: []
        }],
      },
    };


    this.editMode = false;
    this.viewUserDetails(this.user);

    // this.deviceWidth = window.innerWidth
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
        this.user = res;
        console.log('response user', res.user.clientLinks[0].clientId);
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
            email: user.email,
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
  cancelUserUpdate() {
    this.editMode = false;
    this.viewUserDetails(this.user);

  }

  // add ranks
  addRank(rank) {
    this.user.user.clientLinks[0].ranks.push(rank);
    this.addRankValue = "";
  }

  // delete rank
  deleteRank(index) {
    this.user.user.clientLinks[0].ranks.splice(index, 1);
  }

  // add assignments
  addAssignments(assignment) {
    this.user.user.clientLinks[0].assignments.push(assignment);
    this.addAssignmentValue = "";
  }

  // delete assignments
  deleteAssignment(index) {
    this.user.user.clientLinks[0].assignments.splice(index, 1);
  }

  //add Roles
  addNewRoles(role) {
    this.user.user.userRoles.push({ roleId: role });
    this.addRoleValue = "";
  }

  //delete Roles
  deleteRoles(index) {
    this.user.user.userRoles.splice(index, 1);
  }


  // get client 
  getClientData() {
    return this.getDetailsService.getClient(this.clientId)
      .subscribe(res => {
        console.log('client data response', res);
        this.clientData = res.client;
      }, err => {
        console.log(err);
      }

      )
  }


  async editToggle() {

    this.zone.run(() => {
      let flag = true;
      if (this.editMode) {
        if (flag) {
          this.editMode = false;
        }
      } else {
        this.editMode = true;
      }
    })

  }
}
