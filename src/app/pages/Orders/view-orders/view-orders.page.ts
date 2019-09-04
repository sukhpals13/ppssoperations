import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';

import { GetDetailsService } from '../../../services/getDetails/get-details.service';

import { OrdersToPickModel } from '../../../interfaces/order';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.page.html',
  styleUrls: ['./view-orders.page.scss'],
})
export class ViewOrdersPage implements OnInit {

  orders : OrdersToPickModel;
  Arr = Array; //Array type captured in a variable
  num:number = 6;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService
  ) { }

  @HostBinding('class.is-shell') get isShell() {
    return (this.orders && this.orders.isShell) ? true : false;
  }

  ngOnInit() {
    this.orders = {
      status: 0,
      orders: [],
      isShell: true
    };
    var i =0;
    while(i<6){
      var obj = {
        orderNumber: null,
        orderSource: null,
        orgName: null,
        orderTotalDue: null,
        orderStatus: null,
        orderSubstatus: null,
        isShell: true
      };
      this.orders.orders.push(obj);
      i++;
    }
  }
  
  ionViewDidEnter() {
    this.getOrderPickingDetails();
  }

  async getOrderPickingDetails(){
    
    this.getDetailsService.getAllOrders()
    .subscribe(res=>{
      console.log(res);
      this.orders = res;
    },err=>{
      console.log(err);
    })
  }

  viewOrderDetails(o){
    this.navCtrl.navigateForward('/orders/view-orders/'+o.orderNumber);
  }

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
      role: 'destructive',
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
