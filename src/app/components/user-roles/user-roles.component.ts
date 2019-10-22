import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostDetailsService } from '../../services/postDetails/post-details.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss'],
})
export class UserRolesComponent implements OnInit {

  @Input() user: any;
  @Input() clientData: any;
  @Input() edit: any;
  @Input() id: any;

  public editModeuserRoles: boolean;
  public addRoleValue: string;
  public select: object;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public postDetailService: PostDetailsService,
    public zone: NgZone,
  ) { }

  ngOnInit() {
    this.editModeuserRoles = false;
    this.addRoleValue = '';

    this.user = {

      user: {
        name: null,
        orgName: null,
        UserNumber: null,
        isShell: true,
        clientLinks: [{
          ranks: [],

        }],
        expandedUserRoles: [{
          accessRights: [],
          
        }],
      },
    };

    this.select = {
      category: undefined,
      name: undefined
    }
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

   // user roles
async saveUserRoles(user){
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  const alert = await this.alertController.create({
    header: "Are you sure ?",
    message: "Are you sure you want to update User roles ?",
    buttons: [{
      text: 'Yes',
      handler: (blah) => {
        loading.present();
        let userId = user._id;
        let postBody = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          mobilePhoneNumber: user.mobilePhoneNumber,
        }
        return this.postDetailService.updateUser(userId, postBody)
          .subscribe(res => {
            console.log('Update user roles response', res);
            loading.dismiss();
            this.alertPopup("Updated", 'User roles updated successfully');
            // this.viewUserDetails(user);
            this.editModeuserRoles = false;
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

cancelUserRoles(){
   this.editModeuserRoles = false;
 }

  async editToggleRoles() {

    this.zone.run(() => {
      let flag = true;
      if (this.editModeuserRoles) {
        if (flag) {
          this.editModeuserRoles = false;
        }
      } else {
        this.editModeuserRoles = true;
      }
    })

  };

}
