import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrdersToPickModel } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(
    public http: HttpClient
  ) { }

  // Get orders that need to be picked
  getListNeedingPicked(){
    return this.http.get<OrdersToPickModel>('https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/listNeedingPicked')
  }
  getAllOrders(){
    return this.http.get<OrdersToPickModel>('https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/list/On Hold/Payment Error')
  }
}
