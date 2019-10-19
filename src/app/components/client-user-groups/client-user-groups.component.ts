import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { DeleteServicesService } from '../../services/deleteServices/delete-services.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-client-user-groups',
  templateUrl: './client-user-groups.component.html',
  styleUrls: ['./client-user-groups.component.scss'],
})
export class ClientUserGroupsComponent implements OnInit {

  @Input() id: any;
  @Input() edit: any;

  @Output() gotResponseSend = new EventEmitter();
  @Output() noDataSend = new EventEmitter();
  @Output() editingPage = new EventEmitter();
  
  add: boolean;
  private addGroupName: string;
  private addingGroup: boolean;

  public clientUserGroup: any;
  public loader: boolean;
  public gotResponse: boolean;
  public noData: boolean;
  public tempGroup: any;
  public editIndex: any;
  public editing: boolean;


  constructor(
    private getDetailService: GetDetailsService,
    private postDetailService: PostDetailsService,
    private deleteServicesService: DeleteServicesService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getuserGroups();
    this.loader = false;
    this.addingGroup = true;
    this.add = false;
    this.gotResponse = false;
    this.noData = true;
    this.editing = false;
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

  getuserGroups() {
    let data;
    return this.getDetailService.getClientUserGroups(this.id)
      .subscribe(res => {
        console.log('get user groups', res);
        this.clientUserGroup = res.groups.map(val=>{
          let obj = {...val,edit:false};
          return obj
        });
        this.tempGroup = {...this.clientUserGroup}
        this.gotResponse = true;
        this.gotResponseSend.emit({gotGroupResponse:true})
        if (this.clientUserGroup.length == 0) {
          this.noData = true;
          this.noDataSend.emit({noGroupData:true})
        } else {
          this.noData = false;
          this.noDataSend.emit({noGroupData:false})
        }
        this.add = false;
      }, err => {
        console.log(err);
        this.add = false;
      })
  }

  // add client user group
  addUserGroup(group) {
    this.addingGroup = false;
    const reqBody = {
      name: group.name,
      description: group.description
    };
    let clientId = this.id;
    console.log('nameeeeee', reqBody);
    return this.postDetailService.addClientUserGroup(clientId, reqBody)
      .subscribe(res => {
        console.log('add group response', res);
        console.log('res group', res.group)
        this.clientUserGroup[this.clientUserGroup.length - 1] = {...res.group,edit:false};
        this.add = false;
        if(this.clientUserGroup.length>0){
          this.noDataSend.emit({noGroupData:false})
        }
        this.addingGroup = true;
      }, err => {
        console.log(err);
        this.addingGroup = true;
        this.alertPopup("Error", JSON.stringify(err.error.message));
        this.add = false;
      }

      )

  }
  // add client user group
  async editUserGroup(group) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const alert = await this.alertController.create({
      header: "Are you sure ?",
      message: "Are you sure you want to update this user group ?",
      buttons: [{
        text: 'Yes',
        handler: (blah) => {
          loading.present();

          this.addingGroup = true;
          const reqBody = {
            name: group.name,
            description: group.description
          };
          let clientId = this.id;
          let groupId = group._id;
          console.log('nameeeeee', name);
          console.log('group id', groupId);
          return this.postDetailService.updateClientUserGroup(clientId, groupId, reqBody)
            .subscribe(res => {
              console.log('Update group response', res);
              // this.getuserGroups();
              loading.dismiss();
              this.alertPopup("Updated", 'Client User Group updated successfully');
              this.editIndex = null;
              this.editing = false;
              this.editingPage.emit()
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

  // delete client user group
  async deleteUserGroup(group) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const alert = await this.alertController.create({
      header: "Are you sure ?",
      message: "Are you sure you want to delete this user group ?",
      buttons: [{
        text: 'Yes',
        handler: (blah) => {
          loading.present();
          console.log('Confirm Yes: blah');
          let clientId = this.id;
          let groupId = group._id;
          return this.deleteServicesService.deleteClientUserGroups(clientId, groupId)
            .subscribe(res => {
              console.log('delete group response', res);
              this.clientUserGroup = this.clientUserGroup.filter(val => { if (val._id != groupId) return val });
              loading.dismiss();
              this.alertPopup("Deleted", 'Client User Group deleted successfully');
              if(this.clientUserGroup.length==0){
                this.noDataSend.emit({noGroupData:true})
              }
              this.editIndex = null;
              this.editing = false;
              this.editingPage.emit()
            }, err => {
              console.log(err);
              loading.dismiss();
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


  // add group user row
  addContactRow() {
    if(this.editIndex==null){
      this.editIndex = this.clientUserGroup.length
      this.editing = true;
      this.editingPage.emit()
    }else{
      this.editIndex = null;
      this.editing = false;
      this.editingPage.emit()
    }
    this.add = true;
    this.clientUserGroup.push({ name: '', description: '', edit: true });
  }

  editGroup(group,i){
    if(this.editIndex==null){
      this.editIndex = i
      this.editing = true;
      this.editingPage.emit()
    }else{
      this.editIndex = null;
      this.editing = false;
      this.editingPage.emit()
    }
    if(this.add==true){
      // this.clientUserGroup = this.clientUserGroup.splice(-1,1)
      // delete this.clientUserGroup[this.clientUserGroup.length-1]
      this.clientUserGroup.pop()
    }
    group.edit = !group.edit;
    if(group.edit==true){
      this.tempGroup = JSON.parse(JSON.stringify(this.clientUserGroup));
    }else{
      group = Object.assign(group,this.tempGroup[i]);
      group.edit = false;
    }
  }
  // cancelAdd(){
  //   if(this.editIndex==null){
  //     this.editIndex = this.clientUserGroup.length
  //     this.editing = true;
  //     this.editingPage.emit()
  //   }else{
  //     this.editIndex = null;
  //     this.editing = false;
  //     this.editingPage.emit()
  //   }
  // }

}
