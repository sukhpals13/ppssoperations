import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service'
import { AlertController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';
import { } from '@angular/material';

interface address {
  name: string;
  display: string;
};
@Component({
  selector: 'app-client-billing-details',
  templateUrl: './client-billing-details.component.html',
  styleUrls: ['./client-billing-details.component.scss'],
})
export class ClientBillingDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() edit: boolean;
  @Input() id: boolean;
  public loader: boolean;
  public billingMethods: Array<string>;
  public addressCheck: Array<address>;
  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public hasError: Boolean = false;
  public billingMethod: string;
  public contactEmailValidation: Boolean = false;
  public validationErrors = { Email: false, addressLine1: false, city: false, state: false, zipCode: false }
  constructor(
    private postDetails: PostDetailsService,
    public alertController: AlertController,
    private cdRef: ChangeDetectorRef
  ) {
    console.log('myCustomComponent');
  }

  ngOnInit() {
    console.log(this.data);
    console.log(this.edit);
    this.loader = false;
    this.billingMethods = [
      'Email',
      'Postal Mail',
      'Hand Delivered'
    ];
    this.addressCheck = [
      { name: 'addressLine1', display: "Address Line 1" },
      { name: 'city', display: "City" },
      { name: 'state', display: "State" },
      { name: 'zipCode', display: "Zip Code" },
    ]
    // this.addressLine1?.errors?.required = false;
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
  editInfoCalled() {
    // this.hasError = false;
    console.log(this.data, this.id)
    this.loader = true;
    let flag = true,
      msg = "";
    if (this.data.billingMethod == "Email") {
      this.checkData('Email')
      if (!this.data.contactEmail) {
        flag = false;
        msg = "Email Required with Billing Method Email!!!";
        this.hasError = true;
      } else {
        flag = true;
      }
    } else if (this.data.billingMethod == "Postal Mail") {
      this.checkData('Postal Mail');
      this.addressCheck.forEach(val => {
        console.log(val)
        if (this.data[val.name] == "" || this.data[val.name] == undefined) {
          flag = false;
          msg = "Address Line 1, City, State and Zip Code are required!!!"
          this.hasError = true;
        }
      })
    }
    if (flag) {
      this.postDetails.updateBillingInfo(this.id, this.data)
        .subscribe(res => {
          console.log(res);
          this.loader = false;
          this.alertPopup("Updated", 'Billing details updated successfully');
          // this.data = res.client.billingInfo;
          // console.log(this.data);
        }, err => {
          this.loader = false;
          console.log(err);
          this.alertPopup("Error!!!", JSON.stringify(err));
        })
    } else {
      this.alertPopup("Error!!!", msg);
      this.loader = false;
    }
    this.cdRef.detectChanges();
  }

  billingMethodChanges() {
    this.billingMethod = this.data.billingMethod;
    setTimeout(() => {
      if (this.data.billingMethod == 'Email') {
        this.validationErrors.addressLine1 = false;
        this.validationErrors.city = false;
        this.validationErrors.state = false;
        this.validationErrors.zipCode = false
      }
      else if (this.data.billingMethod == 'Postal Mail') {
        this.validationErrors.Email = false;
      }
    }, 100);
  }

  checkData(billingType) {
    for (let key in this.validationErrors) {
      if (this.data[key] == null || this.data[key] == undefined || this.data[key] == '') {
        this.validationErrors[key] = true;
      }
      else {
        this.validationErrors[key] = false;
      }
    }
    if (billingType == 'Email') {
      this.validationErrors.addressLine1 = false;
      this.validationErrors.city = false;
      this.validationErrors.state = false;
      this.validationErrors.zipCode = false
    }
    else {
      this.validationErrors.Email = false;
    }
  }

  checkValidation(data, name) {
    setTimeout(() => {
      if (data.control.errors && data.control.errors.required == true) {
        this.validationErrors[name] = true;
      }
      else {
        this.validationErrors[name] = false;
      }
    }, 200);
  }

}
