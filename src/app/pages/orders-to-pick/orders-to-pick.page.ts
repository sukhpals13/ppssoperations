import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from '@ionic/angular';

// Get order details
import { GetDetailsService } from '../../services/getDetails/get-details.service';

import { Order } from '../../interfaces/orders'

@Component({
  selector: 'app-orders-to-pick',
  templateUrl: './orders-to-pick.page.html',
  styleUrls: ['./orders-to-pick.page.scss'],
})
export class OrdersToPickPage implements OnInit {

  orders : Array<Order>;
  Arr = Array; //Array type captured in a variable
  num:number = 6;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService
  ) { }

  ngOnInit() {
    this.orders = [];
  }
  
  ionViewDidEnter() {
    this.getOrderPickingDetails();
  }
  
  // Get all the order that need to be picked or picking
  async getOrderPickingDetails(){
    // Loader at the start of the page
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    this.getDetailsService.getListNeedingPicked()
    .subscribe(res=>{
      console.log(res);
      loading.dismiss();
      this.orders = res.orders.map(val=>{
        let obj = {
          orderNumber: val.orderNumber,
          orderSource: val.orderSource,
          orgName: val.orgName,
          orderAge: val.orderAge,
          orderStatus: val.orderStatus,
          orderSubstatus: val.orderSubstatus,
        };
        return obj
      })
      this.orders.push({
        orderNumber: 1,
        orderSource: 'abc',
        orgName: 'test',
        orderAge: 'some days',
        orderStatus: 'done',
        orderSubstatus: 'Picking'
      })
      console.log(this.orders);
    },err=>{
      loading.dismiss();
      console.log(err);
    })
  }

  // Options that appear on clicking on the order
  async openActionSheet(o) {
    let pickOptions = [{
      text: 'Begin Pick',
      icon: 'play',
      handler: () => {
        console.log('Begin clicked');
      }
    }, {
      text: 'Resume Pick',
      icon: 'bicycle',
      handler: () => {
        console.log('Resume clicked');
      }
    }, {
      text: 'End Pick',
      icon: 'power',
      handler: () => {
        console.log('End clicked');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
    let finalPickOptions = (o.orderSubstatus=='Needs Picked')?pickOptions.filter((v,i)=>{if(i==0||i==3)return v}):pickOptions.filter((v,i)=>{if(i==1||i==2||i==3)return v});

    console.log(finalPickOptions)
    const actionSheet = await this.actionSheetController
    .create({
      header: 'Picking Options',
      buttons: finalPickOptions
    });

    await actionSheet.present();
  }
}
