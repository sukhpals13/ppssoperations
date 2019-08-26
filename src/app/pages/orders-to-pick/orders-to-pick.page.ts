import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

// Get order details
import { GetDetailsService } from '../../services/getDetails/get-details.service';

import { Order } from '../../interfaces/pages'

@Component({
  selector: 'app-orders-to-pick',
  templateUrl: './orders-to-pick.page.html',
  styleUrls: ['./orders-to-pick.page.scss'],
})
export class OrdersToPickPage implements OnInit {

  orders : Array<Order>

  constructor(
    public navCtrl: NavController,
    private getDetailsService: GetDetailsService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getDetailsService.getListNeedingPicked()
    .subscribe(res=>{
      console.log(res);
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
      console.log(this.orders)
    },err=>{
      console.log(err)
    })
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }

}
