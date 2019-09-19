import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';

// Get order details
import { GetDetailsService } from '../../../services/getDetails/get-details.service';

import { OrderModel, Products } from '../../../interfaces/order';

import { Router, ActivatedRoute } from '@angular/router';

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
  private pickedQty = 0;
  private needsPickedQty = 0;
  private needsOrderedQty = 0;
  public remainingCount =0;


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
      // console.log('it onumber',it);
      this.orderNumber = it.oNumber;
      this.productNumber = it.pNumber;
    })
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
        variants: [
          {
            name: null,
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
        variants: [
          {
            name: null,
            value: null,
            isShell: true
          },
          {
            name: null,
            value: null,
            isShell: true
          },
        ],
        customizations: [],
        isShell: true
      },
      {
        variants: [
          {
            name: null,
            value: null,
            isShell: true
          },
          {
            name: null,
            value: null,
            isShell: true
          },
        ],
        customizations: [],
        isShell: true
      },
    ]
  }

  ionViewDidEnter() {
    this.menu.enable(true);
    this.getOrders();
    // this.step = 0;
  }

  // setStep(index: number) {
  //   this.step = index;
  // }

  getTypeOfOrders() {
    if (this.router.url == "/orders/view-orders/" + this.orderNumber) {
      return this.getDetailsService.getAllOrders(null);
    }
    else if (this.router.url == "/orders/to-pick/" + this.productNumber) {
      this.showPickInfo = true;
      return this.getDetailsService.getListNeedingPicked();
      //  this.getDetailsService.getListNeedingPicked();
    }
  }

  // Get all the order that need to be picked or picking
  async getOrders() {
    this.getTypeOfOrders()
      .subscribe(res => {
        console.log('response order detail data', res);
        let order, products;
        order = res.orders.filter(val => {
          // console.log('ordernum',val.orderNumber);
          // console.log('this ordernum',this.productNumber);
          if (val.orderNumber == this.orderNumber || val.orderNumber == this.productNumber)
            return val;
        })[0];
        order.userName = order.userInfo.firstName + ' ' + order.userInfo.lastName;
        if (order.shipping)
          order.address = (order.shipping.streetAddress ? order.shipping.streetAddress + ',' : '') + (order.shipping.city ? order.shipping.city + ', ' : '') + (order.shipping.state ? order.shipping.state + '-' : '') + (order.shipping.zipCode ? order.shipping.zipCode : '');
        else
          order.address = '-';
        let date = new Date(order.created);
        let mm = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
        let dd = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
        order.date = mm + '/' + dd + '/' + date.getFullYear();
        products = [...order.products];
        products = products.map(val => {
          let obj = { ...val };
          obj.variants = [];
          obj.isShell = true;
          let variantsName = [],
            variantsVal = [],
            customNames = [],
            customVals = [];
          for (let v in obj) {
            if (v.includes('has')) {
              let o = {
                name: v,
                nameToShow: v.split(/(?=[A-Z])/).reverse().slice(0, v.split(/(?=[A-Z])/).length - 1).reverse().join(' '),
                value: obj[v]
              }
              customNames.push(o);
              // }
            }
            if (v.includes('DisplayText')) {
              customVals.push(obj[v])
            }
            if (v.includes('variant')) {
              if (v.includes('Name')) {
                variantsName[parseInt(v.slice(7, 8)) - 1] = obj[v];
              }
              if (v.includes('Value')) {
                variantsVal[parseInt(v.slice(7, 8)) - 1] = obj[v];
              }
            }
          }
          variantsName.forEach((v, i) => {
            obj.variants[i] = {
              name: v,
              value: variantsVal[i],
              isShell: true
            };
          })
          let finalVal = customNames.map((v, i) => {
            let obj = { name: v.nameToShow, value: customVals[i], isShell: v.value }
            return obj
          }).filter(v => {
            if (v.isShell)
              return v
          })
          obj.customizations = finalVal;
          obj.imageToShow = obj.mainPictureURI.includes('http') ? obj.mainPictureURI : (obj.mainPictureURI.includes('//') ? obj.mainPictureURI : 'https://integration.ebusiness.pittsburghpublicsafety.com' + obj.mainPictureURI);

          if (obj.customizationPriceDetails) {
            if (obj.customizationPriceDetails.multiplePriceDetails) {
              obj.multipleProductsArray = []
              obj.multipleProductsArray = [...obj.customizationPriceDetails.summary.split(', ')]
              console.log('multi price details')
              console.log(obj.multipleProductsArray)
              obj.multipleProductsArray = obj.multipleProductsArray.map(val => {
                let o = {
                  summary: val.split('$')[0],
                  price: parseInt(val.split('$')[1])
                }
                return o
              })
            }
            obj.mp = JSON.stringify(obj.multipleProductsArray)
            console.log('customprice available')
          }
          return obj;
        })
        this.order = order;
        this.products = products.map(val => {
          let newObj = val;
          console.log('val',val);
          newObj.subStatus = "open";
          return newObj;
        });
        
      }, err => {
        console.log(err);
      })


      
  }

  // edit substatus

  // substatus options open
  substatusOptions(p) {
    if (p.quantity == 1) {
      console.log('quantity', p.quantity);
      this.statuseditshow = true;
      this.statuseditMaxQty = false;
    }
    else if (p.quantity > 1) {
      this.statuseditMaxQty = true;
      this.statuseditshow = false;
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
 increment(type, p){
    switch(type){
      case 'picked':
          this.pickedQty++
          break;
      case 'need':
          this.needsPickedQty++;
          break;
      case 'ordered':
          this.needsOrderedQty++;
          break
    }
  }

  // Decrement order quantity
  decrement(type, p){
    switch(type){
      case 'picked':
         if (this.pickedQty == 0) {
            return;
          } else {
            this.pickedQty--;
          }
           break;
      case 'need':
          if (this.needsPickedQty == 0) {
            return;
          } else {
            this.needsPickedQty--;
          }
          break;
      case 'ordered':
          if (this.needsOrderedQty == 0) {
            return;
          } else {
            this.needsOrderedQty--;
          }
          break
    }
  }

  // check total quantity
  checkTotal(qty){
    let total = this.pickedQty + this.needsPickedQty + this.needsOrderedQty;
    return total == qty ? true : false;
  }

// submit substatuses for multiple quantity


  SubmitSubStatuses(prod, qty){
    console.log('productttttttttttttt',prod);
     let newstatuses={
        picked:this.pickedQty,
        needsPicked:this.needsPickedQty,
        needsOrdered:this.needsOrderedQty,
     }
     let multiSubstatus = '';
     Object.entries(newstatuses).forEach(val=>{
       console.log('foreach val',val);
       multiSubstatus += val[0]+'  '+ ':'+ val[1]+' ' ;
       prod.subStatus = multiSubstatus.toUpperCase();
       
    })
    // prod.subStatus={} = multiSubstatus;
    console.log('multiSubstatus',multiSubstatus);
  }

} 
