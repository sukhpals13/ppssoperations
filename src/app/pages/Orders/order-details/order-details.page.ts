import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';

// Get order details
import { GetDetailsService } from '../../../services/getDetails/get-details.service';

import { OrderModel, Products } from '../../../interfaces/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: OrderModel;
  products: Array<Products>;

  // userInfo : Object;

  @HostBinding('class.is-shell') get isShell() {
    return (this.order && this.order.isShell) ? true : false;
  }

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService
  ) { }

  ngOnInit() {
    this.order = {
      orderNumber: null,
      orderSource: null,
      orgName: null,
      orderAge: null,
      orderStatus: null,
      orderSubstatus: null,
      orderTotalDue: null,
      userInfo: {
        isShell: true
      },
      shipping: {
        isShell: true
      },
      paymentToken: {},
      products: [{
        variants:[
          {
            name:null,
            value: null,
            isShell: true
          },
        ],
        isShell: true
      }],
      address: null,
      userName: null,
      date: null,
      isShell: true
    }
    this.products = [
      {
      variants:[
        {
          name:null,
          value: null,
          isShell: true
        },
        {
          name:null,
          value: null,
          isShell: true
        },
      ],
      isShell: true
      },
      {
        variants:[
          {
            name:null,
            value: null,
            isShell: true
          },
          {
            name:null,
            value: null,
            isShell: true
          },
        ],
        isShell: true
        },
    ]
    // this.orderInfo = {};
    // this.orderInfoArray = [
    //   'orderNumber',
    //   'orderStatus',
    //   'orgName',
    //   'orderType',
    //   'created'
    // ];
    // this.orderInfoNames = [
    //   'Order Number',
    //   'Status',
    //   'Organization',
    //   'Order Type',
    //   'Order Date'
    // ];
    // this.order = {
    //   userInfo:{},
    //   shipping:{}
    // }
  }

  ionViewDidEnter() {
    this.getOrders();
  }
  
  // Get all the order that need to be picked or picking
  async getOrders(){
    this.getDetailsService.getAllOrders()
    .subscribe(res=>{
      console.log(res);
      let order,products;
      order = res.orders[0];
      order.userName = order.userInfo.firstName + ' ' + order.userInfo.lastName;
      order.address = order.shipping.streetAddress + ', '+ order.shipping.city + ', ' + order.shipping.state + '-' + order.shipping.zipCode;
      let date = new Date(order.created);
      let mm = (date.getMonth() + 1)>10?(date.getMonth()+1):"0"+(date.getMonth()+1);
      let dd = date.getDate()>10?date.getDate():"0"+date.getDate();
      order.date = mm+'/'+dd+'/'+date.getFullYear();
      products = [...order.products];
      products = products.map(val=>{
        let obj = {...val};
        obj.variants = [];
        obj.isShell = true;
        let variantsName = [],
        variantsVal = [];
        for(let v in obj){
          if(v.includes('has')){
            console.log(v,obj[v],'custom');
          }
          if(v.includes('variant')){
            console.log(v,obj[v],'variant');
            if(v.includes('Name')){
              variantsName[parseInt(v.slice(7,8))-1] = obj[v];
            }
            if(v.includes('Value')){
              variantsVal[parseInt(v.slice(7,8))-1] = obj[v];
            }
          }
        }
        variantsName.forEach((v,i)=>{
          obj.variants[i] = {
            name: v,
            value: variantsVal[i],
            isShell: true
          };
        })
        console.log(variantsName,variantsVal);
        console.log(obj.variants);
        return obj;
      })
      this.order = order;
      this.products = products;
      console.log(this.products)
    },err=>{
      console.log(err);
    })
  }

}
