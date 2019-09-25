import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';

import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';

import { OrdersToPickModel } from '../../../interfaces/order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-to-pick',
  templateUrl: './orders-to-pick.page.html',
  styleUrls: ['./orders-to-pick.page.scss'],
})
export class OrdersToPickPage implements OnInit {

  orders: OrdersToPickModel;
  Arr = Array; //Array type captured in a variable
  num: number = 6;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService,
    public postDetailsService: PostDetailsService,
    public menu: MenuController,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
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
    var i = 0;
    while (i < 6) {
      var obj = {
        orderNumber: null,
        orderSource: null,
        orgName: null,
        orderAge: null,
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
    this.menu.enable(true);
  }
  // get all the order to pick
  async getOrderPickingDetails() {

    this.getDetailsService.getListNeedingPicked()
      .subscribe(res => {
        this.orders = res;
        console.log(res, 'called now', this.orders)
      }, err => {
        console.log(err);
      })
  }

  viewPickDetails(o) {
    this.navCtrl.navigateForward('orders/to-pick/' + o.orderNumber);
  }

  // Edit pick detail
  editPickDetails(o) {
    this.navCtrl.navigateForward('orders/to-pick/edit/' + o.orderNumber);
  }

  // Begin pick status
  async changePickStatus(order, type) {
    console.log('ordertopick order', order);
    let reqBody = {
      orderID: order._id,
      // status: type == 'Begin' ? 'Started' : (type == 'Resume' ? 'Resume' : 'Completed'),
      // subStatus: (type=="Picked"||type == 'Resume') ? 'Picked' : 'Delivered',
      status: "In Progress",
      subStatus: "Picking",
    };
    this.postDetailsService.completeStatusUpdate(reqBody)
      .subscribe(res => {
        console.log(res);
        this.zone.run(() => {
          order.orderStatus = reqBody.status;
          order.orderSubStatus = reqBody.subStatus;
        })
        this.editPickDetails(order);
      },
        err => {
          console.log(err);
        }

      )
  }

  // Opening the action sheet when clicked on pick order
  async openActionSheet(o) {
    console.log('orderrrrrr',o);
    let pickOptions = [{
      text: 'Begin Pick',
      icon: 'play',
      handler: () => {
        this.changePickStatus(o, 'Begin');
        console.log('Begin Pick');

      } 
    }, {
      text: 'Resume Pick',
      icon: 'bicycle',
      handler: () => {
        // this.changePickStatus(o, 'Resume');
        console.log('Resume Pick');
      }
    }, {
      text: 'End Pick',
      icon: 'power',
      role: 'destructive',
      handler: () => {
        // this.changePickStatus(o, 'End');
        console.log('End Pick');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }, {
      text: 'Pick Detail',
      icon: 'arrow-forward',
      handler: () => {
        console.log('pick detail clicked');
        this.viewPickDetails(o);
      }
    }]
    // filtering what to show depending upon the status of the order
    // let finalPickOptions = (o.orderSubStatus == 'Needs Picked') ? pickOptions.filter((v, i) => { if (i == 0 || i == 3 || i == 4) return v }) : (o.orderSubStatus == 'Needs Picked')?pickOptions.filter((v, i) => { if ( i == 3 ) return v }) : pickOptions.filter((v, i) => { if (i == 1 || i == 2 || i == 3 || i == 4) return v });
    let finalPickOptions = [...pickOptions];
    
    // console.log(finalPickOptions)
    const actionSheet = await this.actionSheetController
      .create({
        header: 'Picking Options',
        buttons: finalPickOptions
      });

    await actionSheet.present();
  }

}
