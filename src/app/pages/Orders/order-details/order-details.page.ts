import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController, MenuController, AlertController } from '@ionic/angular';

// Get order details
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';

import { OrderModel, Products } from '../../../interfaces/order';

import { Router, ActivatedRoute } from '@angular/router';
import { defaultOrder, defaultProduct } from '../../default/default-data'
import { setOrderDetails, setProductsDetails } from '../../default/default-functions'


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: OrderModel;
  products: Array<Products>;
  step: number;
  public orderNumber: number;
  public productNumber: number;
  public showPickInfo: boolean;
  public statuseditshow = false;
  public statuseditMaxQty = false;
  public editOrderCheck: boolean;
  public remainingCount = 0;
  public completeClicked: boolean;


  // userInfo : Object;

  @HostBinding('class.is-shell') get isShell() {
    return (this.order && this.order.isShell) ? true : false;
  }

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService,
    private postDetailsService: PostDetailsService,
    public alertCtrl: AlertController,
    private _Activatedroute: ActivatedRoute,
    public menu: MenuController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.showPickInfo = false;
    this.editOrderCheck = false;
    console.log(this._Activatedroute);
    this._Activatedroute.params.subscribe(it => {
      this.orderNumber = it.oNumber;
      this.productNumber = it.pNumber;
    })
    this.order = defaultOrder;
    this.products = defaultProduct;
    this.completeClicked = false;
  }

  ionViewDidEnter() {
    this.menu.enable(true);
    this.getOrders();
  }

  getTypeOfOrders() {
    if (this.router.url == "/orders/view-orders/" + this.orderNumber) {
      return this.getDetailsService.getAllOrders(null);
    }
    else if (this.router.url == "/orders/to-pick/" + this.productNumber) {
      this.showPickInfo = true;
      return this.getDetailsService.getListNeedingPicked();
    }
    else if (this.router.url == "/orders/to-pick/edit/" + this.productNumber) {
      this.editOrderCheck = true;
      this.showPickInfo = true;
      return this.getDetailsService.getListNeedingPicked();
    }
  }

  // Get all the order that need to be picked or picking
  async getOrders() {
    this.getTypeOfOrders()
      .subscribe(res => {
        console.log('resssss', res)
        let products;
        this.order = setOrderDetails(res.orders, this.orderNumber, this.productNumber);
        products = setProductsDetails(this.order.products);
        this.products = products
        this.products = products.map(val => {
          let newObj = val;
          // console.log('val', val); 
          //newObj.subStatus = "Open";
          newObj.pickedQty = 0;
          newObj.needsPickedQty = 0;
          newObj.needsOrderedQty = 0;
          newObj.subStatusToShow = Object.entries(newObj.subStatus)
          return newObj;
        });

      }, err => {
        console.log(err);
      })
  }

  // edit substatus
  changeProductSubStatus(p, v, o) {
    console.log(v)
    p.subStatus = {
      "Picked": (v == 'Picked') ? 1 : 0,
      "Needs Picked": (v == 'Needs Pick') ? 1 : 0,
      "Needs Ordered": (v == 'Needs Ordered') ? 1 : 0,
    };
    p.subStatusToShow = Object.entries(p.subStatus);
    let reqBody = {
      subStatus: p.subStatus,
      status: p.status,
    }
    let orderId = o._id;
    let prodId = p._id;
    p.statuseditshow = false;
    console.log(typeof p)
    console.log(p)
    this.postDetailsService.updateProductStatusDetails(orderId, prodId, reqBody)
      .subscribe(res => {
        console.log('response', res);
      },
        err => {
          console.log(err);
        })
  }

  // substatus options open
  substatusOptions(p) {
    if (p.quantity == 1) {
      console.log('quantity', p.quantity);
      p.statuseditshow = true;
      p.statuseditMaxQty = false;
    }
    else if (p.quantity > 1) {
      p.statuseditMaxQty = true;
      p.statuseditshow = false;
    }
  }

  //substatus options close
  substatusClose() {
    this.statuseditshow = false;
    this.statuseditMaxQty = false;
  }
  // edit substatus 
  editSubstatus(p, setstatus) {
    this.statuseditshow = true;
    p.subStatus = setstatus;
  }
  increment(type, p) {
    switch (type) {
      case 'picked':
        p.pickedQty++
        break;
      case 'need':
        p.needsPickedQty++;
        break;
      case 'ordered':
        p.needsOrderedQty++;
        break
    }
  }

  // Decrement order quantity // check so that order does not increase from the max quantity
  decrement(type, p) {
    switch (type) {
      case 'picked':
        if (p.pickedQty == 0) {
          return;
        } else {
          p.pickedQty--;
        }
        break;
      case 'need':
        if (p.needsPickedQty == 0) {
          return;
        } else {
          p.needsPickedQty--;
        }
        break;
      case 'ordered':
        if (p.needsOrderedQty == 0) {
          return;
        } else {
          p.needsOrderedQty--;
        }
        break
    }
  }

  // check total quantity
  checkTotal(prod) {
    let total = prod.pickedQty + prod.needsPickedQty + prod.needsOrderedQty;
    return total == prod.quantity ? true : false;
  }

  // submit substatuses for multiple quantity
  SubmitSubStatuses(prod, order) {
    // console.log('productttttttttttttt', prod);
    prod.subStatus = {
      "Picked": prod.pickedQty,
      "Needs Picked": prod.needsPickedQty,
      "Needs Ordered": prod.needsOrderedQty,
    }
    let reqBody = {
      subStatus: {
        "Picked": prod.pickedQty,
        "Needs Picked": prod.needsPickedQty,
        "Needs Ordered": prod.needsOrderedQty,
      },
      status: prod.status,
    }
    prod.subStatusToShow = Object.entries(prod.subStatus)
    let prodID = prod._id;
    let orderID = order._id;
    prod.statuseditMaxQty = false;
    // console.log(prod)
    this.postDetailsService.updateProductStatusDetails(orderID, prodID, reqBody)
      .subscribe(res => {
        console.log('response', res);
      },
        err => {
          console.log(err);
        })

  }

  async alertPopup(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }

  // Complete status
  completeStatus(order, product) {
    this.completeClicked = true;
    let flag = true;
    let reqBody = {
      orderID: order._id,
      status: "In Progress",
      subStatus: "Pick Complete"
    };
    product.forEach(val => {
      console.log(val.subStatus);
      if (val.subStatus.Picked + val.subStatus["Needs Ordered"] !== val.quantity) {
        this.completeClicked = false;
        flag = false;

      }
    });

    if (flag) {
      this.postDetailsService.completeStatusUpdate(reqBody)
        .subscribe(res => {
          console.log('ordercomplete response');
          this.navCtrl.navigateBack('/orders/to-pick');
          this.completeClicked = false;
        },
          err => {
            this.completeClicked = false;
            console.log(err);
          }
        )
    } else {
      this.alertPopup("Alert", "All products are not Set!")
    }




  }

  // back to pick list
  backToPick(order) {
    let reqBody = {
      orderID: order._id,
      status: "In Progress",
      subStatus: "Pick Suspended"
    };
    this.postDetailsService.completeStatusUpdate(reqBody)
      .subscribe(res => {
        this.navCtrl.navigateBack('/orders/to-pick');
      },
        err => {
          console.log(err);
        }
      )
  }
  checkSubStatusType(p) {
    return typeof p.subStatus
  }

} 
