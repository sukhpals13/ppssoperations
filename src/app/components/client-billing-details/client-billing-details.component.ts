import { Component, OnInit, Input } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service'
import { AlertController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';
import { } from '@angular/material';

interface address {
  name:string;
  display:string;
};
@Component({
  selector: 'app-client-billing-details',
  templateUrl: './client-billing-details.component.html',
  styleUrls: ['./client-billing-details.component.scss'],
})
export class ClientBillingDetailsComponent implements OnInit {
  @Input()  data: any;
  @Input()  edit: boolean;
  @Input()  id: boolean;
  public loader: boolean;
  public billingMethods: Array<string>;
  public addressCheck: Array<address>;
  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    private postDetails: PostDetailsService,
    public alertController: AlertController,
  ) {
    console.log('myCustomComponent');
   }

  ngOnInit() {
    console.log(this.data);
    console.log(this.edit);
    this.loader=false;
    this.billingMethods = [
      'Email',
      'Postal Mail',
      'Hand Delivered'
    ];
    this.addressCheck = [
      {name:'addressLine1',display:"Address Line 1"},
      {name:'city',display:"City"},
      {name:'state',display:"State"},
      {name:'zipCode',display:"Zip Code"},
    ]
  }
  async alertPopup(title,msg){
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }
  editInfoCalled() {
    console.log(this.data,this.id)
    this.loader = true;
    let flag = true,
    msg = "";
    if(this.data.billingMethod=="Email"){
      if(!this.data.contactEmail){
        flag = false;
        msg = "Email Required with Billing Method Email!!!";
      }else{
        flag = true;
      }
    }else if(this.data.billingMethod=="Postal Mail"){
      this.addressCheck.forEach(val=>{
        console.log(val)
        if(this.data[val.name]==""||this.data[val.name]==undefined){
          flag = false;
          msg = "Address Line 1, City, State and Zip Code are required!!!"
        }
      })
    }
    if(flag){
      this.postDetails.updateBillingInfo(this.id,this.data)
      .subscribe(res=>{
        console.log(res);
        this.loader = false;
        this.alertPopup("Updated",'Billing details updated successfully');
        // this.data = res.client.billingInfo;
        // console.log(this.data);
      }, err=>{
        this.loader = false;
        console.log(err);
        this.alertPopup("Error!!!",JSON.stringify(err));
      })
    }else{
      this.alertPopup("Error!!!",msg);
      this.loader = false;
    }
  }

  
}
