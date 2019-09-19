import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';

// Get order details
import { GetDetailsService } from '../../../services/getDetails/get-details.service';

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
  // private pickedQty = 0;
  // private needsPickedQty = 0;
  // private needsOrderedQty = 0;
  public remainingCount = 0;


  // userInfo : Object;

  @HostBinding('class.is-shell') get isShell() {
    return (this.order && this.order.isShell) ? true : false;
  }

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService,
    private _Activatedroute: ActivatedRoute,
    public menu: MenuController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.showPickInfo = false;
    console.log(this._Activatedroute);
    this._Activatedroute.params.subscribe(it => {
      this.orderNumber = it.oNumber;
      this.productNumber = it.pNumber;
    })
    this.order = defaultOrder;
    this.products = defaultProduct;
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
  }

  // Get all the order that need to be picked or picking
  async getOrders() {
    this.getTypeOfOrders()
      .subscribe(res => {
        let products;
        this.order = setOrderDetails(res.orders,this.orderNumber,this.productNumber);
        products = setProductsDetails(this.order.products);
        this.products = products.map(val => {
          let newObj = val;
          console.log('val', val);
          newObj.subStatus = "Open";
          newObj.pickedQty = 0;
          newObj.needsPickedQty = 0;
          newObj.needsOrderedQty = 0;
          return newObj;
        });

      }, err => {
        console.log(err);
      })
  }

  // edit substatus
  changeProductSubStatus(p, v) {
    p.subStatus = v;
    p.statuseditshow = false;
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
  SubmitSubStatuses(prod) {
    // console.log('productttttttttttttt', prod);
    let newstatuses = {
      "Picked": prod.pickedQty,
      "Needs Picked": prod.needsPickedQty,
      "Needs Ordered": prod.needsOrderedQty,
    }
    let multiSubstatus = '';
    Object.entries(newstatuses).forEach(val => {
      console.log('foreach val', val);
      multiSubstatus += '<div>'+val[0] + ' : ' + val[1] + ' </div>';
      console.log(multiSubstatus)
      prod.subStatus = multiSubstatus;
    })
    prod.statuseditMaxQty = false;
  }

  // back to pick list
  backToPick(){
    this.navCtrl.navigateBack('/orders/to-pick');
  }
  

} 
