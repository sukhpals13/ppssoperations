import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';

import { GetDetailsService } from '../../../services/getDetails/get-details.service';

import { OrdersToPickModel } from '../../../interfaces/order';

import { MatDialog } from '@angular/material/dialog';
import { OrderFilterComponent } from '../../../components/order-filter/order-filter.component'


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.page.html',
  styleUrls: ['./view-orders.page.scss'],
})
export class ViewOrdersPage implements OnInit {

  orders : OrdersToPickModel;
  Arr = Array; //Array type captured in a variable
  num:number = 6;
  
  filter : {
    status: string;
    subStatus: string;
  }

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public menu: MenuController,
    public dialog: MatDialog,
    private getDetailsService: GetDetailsService,
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
    this.initializeData()
    this.filter = {
      status : "New",
      subStatus: "Needs Picked"
    }
  }
  
  initializeData(){
    this.orders.orders = [];
    var i =0;
    while(i<6){
      var obj = {
        orderNumber: null,
        orderSource: null,
        orgName: null,
        orderTotalDue: null,
        orderStatus: null,
        orderSubStatus: null,
        isShell: true
      };
      this.orders.orders.push(obj);
      i++;
    }
  }

  ionViewDidEnter() {
    this.getOrders(this.filter);
    // enables the menu bar for the page
    this.menu.enable(true);
  }
  // get all the orders
  async getOrders(data){
    this.getDetailsService.getAllOrders(data)
    .subscribe(res=>{
      console.log(res);
      this.orders = res;
    },err=>{
      console.log(err);
    })
  }
  // opening of the order details page
  viewOrderDetails(o){
    this.navCtrl.navigateForward('/orders/view-orders/'+o.orderNumber);
  }
  // opening the filter dialog
  openFilters(): void {
    const dialogRef = this.dialog.open(OrderFilterComponent, {
      width: '250px',
      data: this.filter
    });
    dialogRef.afterClosed().subscribe(data => {
      // console.log('The dialog was closed',data);
      if(data){
        this.initializeData();
        this.getOrders(data);
      }
    });
  }

}
