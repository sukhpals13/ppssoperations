import { Component, OnInit, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostDetailsService } from '../../services/postDetails/post-details.service';

@Component({
  selector: 'app-user-client-links',
  templateUrl: './user-client-links.component.html',
  styleUrls: ['./user-client-links.component.scss'],
})
export class UserClientLinksComponent implements OnInit {

  @Input() user: any;
  @Input() clientData: any;
  @Input() edit: any;
  @Input() id: any;
  @Input() clientGroups: any;
  @Output() editClicked = new EventEmitter;

  public editModeClientLinks: boolean;
  public initialClientLinks: any;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public postDetailService: PostDetailsService,
    public zone: NgZone,
  ) { }

  ngOnInit() {

    this.editModeClientLinks = false;
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


  async editToggleClientLinks() {
    this.zone.run(() => {
      let flag = true;
      if (this.editModeClientLinks) {
        if (flag) {
          this.editModeClientLinks = false;
          this.editClicked.emit()
        }
      } else {
        this.editModeClientLinks = true;
        this.editClicked.emit()
      }
    })

  };


  // user client links
async saveClientLinks(user){
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  const alert = await this.alertController.create({
    header: "Are you sure ?",
    message: "Are you sure you want to update User client links ?",
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
            this.alertPopup("Updated", 'User client links updated successfully');
            // this.viewUserDetails(user);
            this.editModeClientLinks = false;
            this.editClicked.emit()
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

cancelClientLinks(){
  // this.viewUserDetails(this.user);
  this.editModeClientLinks = false;
  this.editClicked.emit()
}

}
