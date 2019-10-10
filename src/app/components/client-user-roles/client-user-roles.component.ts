import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { DeleteServicesService } from '../../services/deleteServices/delete-services.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-client-user-roles',
  templateUrl: './client-user-roles.component.html',
  styleUrls: ['./client-user-roles.component.scss'],
})
export class ClientUserRolesComponent implements OnInit {

  @Input() id: any;
  @Input() edit: any;

  public roles: Array<any>;
  public gotResponse: boolean;
  public categories: Array<any>;
  public userAccessRights: Array<any>;
  public reportAccessRights: Array<any>;
  public orderAccessRights: Array<any>;
  public accessRights: Array<any>;
  public addAccessRights: Array<any>;
  public select: object;
  public selectRoleToAdd: object;
  public adding: boolean;
  public roleToAdd: object;
  public noData: boolean;

  constructor(
    private getDetailService: GetDetailsService,
    private postDetailsService: PostDetailsService,
    private deleteDetailsService: DeleteServicesService,
    public alrtCtrl: AlertController,
    public loadingController: LoadingController,
    public zone: NgZone,
  ) { }

  async alertPopup(title, msg) {
    const alert = await this.alrtCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }

  ngOnInit() {
    this.getuserroles();
    this.gotResponse = false;
    this.noData = false;
    this.roleToAdd = {
      rights:[],
      accessRights: []
    };
    this.roles = [
      {
        rights: [],
        accessRights: [
          {
            category: '',
            name: ''
          }
        ]
      }
    ]
    this.categories = [
      { value: "order", viewValue: "Order" },
      { value: "user", viewValue: "User" },
      { value: "reporting", viewValue: "Reporting" },
    ]
    this.select = {
      category: undefined,
      name: undefined
    }
    this.selectRoleToAdd = {
      category: undefined,
      name: undefined
    }
    this.userAccessRights = [
      { value: "add", viewValue: "Add" },
      { value: "remove", viewValue: "Remove" },
      { value: "update", viewValue: "Update" },
      { value: "reset_password", viewValue: "Reset Password" },
    ]
    this.reportAccessRights = [
      { value: "view_agency_orders", viewValue: "View Agency Orders" },
      { value: "view_allotment_orders", viewValue: "View Allotment Orders" },
      { value: "view_order_history", viewValue: "View Order History" },
      { value: "view_open_orders", viewValue: "View Open Orders" },
    ]
    this.orderAccessRights = [
      { value: "order_approval", viewValue: "Order Approval" },
      { value: "place_order_on_behalf_of", viewValue: "Place Order on Behalf of" },
    ]
    this.accessRights = [];
    this.addAccessRights = [];
    this.adding = false;
  }

  remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  getuserroles() {
    return this.getDetailService.getClientUserRoles(this.id)
      .subscribe(res => {
        let roles = res.roles;
        roles.forEach(role => {
          if (role.accessRights) {
            role.rights = role.accessRights.map(val => {
              let obj = { ...val };
              obj.nameToShow = obj.name.split('_').join(' ');
              return obj
            })
          }
        })
        this.zone.run(()=>{
          this.roles = roles;
          this.gotResponse = true;
          if(this.roles.length==0){
            this.noData = true
          }else{
            this.noData = false
          }
        })
      }, err => {
        console.log(err);
      }
      )
  }

  deleteAccessRight(r,i) {
    // console.log(r,i);
    r.accessRights = r.accessRights.filter((val,index)=>{
      if(index!=i){
        return val
      }
    });
    r.rights = r.rights.filter((val,index)=>{
      if(index!=i){
        return val
      }
    });
    // console.log(r,i)
  }

  addRole(){
    this.adding = !this.adding;
  }
  changeAccessRights(cat,type) {
    let accessType = 'accessRights'
    if(type == 'add'){
      accessType = 'addingAccessRights'
    }
    if (cat == "order") {
      this[accessType] = this.orderAccessRights;
    } else if (cat == "user") {
      this[accessType] = this.userAccessRights;
    } else {
      this[accessType] = this.reportAccessRights;
    }
    console.log(this[accessType]);
  }
  addAccessRight(s, r) {
    console.log(s, r);
    r.accessRights.push({...s});
    r.rights = r.accessRights.map(val => {
      let obj = { ...val };
      obj.nameToShow = obj.name.split('_').join(' ');
      return obj
    })
    s.name = undefined;
    s.category = undefined;
  }

  addSelectedRoleAddAccessRight(s,r) {
    r.accessRights.push({...s});
    r.rights = r.accessRights.map(val => {
      let obj = { ...val };
      obj.nameToShow = obj.name.split('_').join(' ');
      return obj
    })
    s.name = undefined;
    s.category = undefined;
  }

  async sendAddRoleRequest(r) {
    console.log(r);
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    loading.present();
    this.postDetailsService.addClientUserRole(this.id,this.roleToAdd)
    .subscribe(res=>{
      console.log(res);
      this.roleToAdd = {
        rights:[],
        accessRights: []
      };
      this.adding = false;
      this.getuserroles();
      loading.dismiss();
    },err=>{
      console.log(err);
    })
  }

  async confirmDeleteRole(id){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const alert = await this.alrtCtrl.create({
      header: "Are you sure ?",
      message: "Are you sure you want to delete this role ?",
      buttons: [{
        text: 'Yes',
        handler: (blah) => {
          loading.present();
          console.log('Confirm Yes: blah');
          // this.deleteRole(id);
          this.deleteDetailsService.deleteClientUserRole(this.id,id)
          .subscribe(res=>{
            console.log(res);
            this.getuserroles();
            loading.dismiss();
          },err=>{
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
    await alert.present();
  }

  // deleteRole(id) {
  //   this.deleteDetailsService.deleteClientUserRole(this.id,id)
  //         .subscribe(res=>{
  //           console.log(res);
  //           this.getuserroles();
  //         },err=>{
  //           console.log(err);
  //         })    
  // }

  async updateRole(r) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const alert = await this.alrtCtrl.create({
      header: "Are you sure ?",
      message: "Are you sure you want to change this role ?",
      buttons: [{
        text: 'Yes',
        handler: (blah) => {
          loading.present();
          console.log('Confirm Yes: blah');
          this.postDetailsService.updateClientUserRole(this.id,r)
          .subscribe(res=>{
            console.log(res);
            this.getuserroles();
            loading.dismiss()
          },err=>{
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
    await alert.present();
  }

}
