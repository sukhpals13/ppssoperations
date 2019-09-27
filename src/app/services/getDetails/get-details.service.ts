import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrdersToPickModel } from '../../interfaces/order';
import { ClientsListModel } from '../../interfaces/clients';

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
  getAllOrders(filter){
    let url = "https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/list";
    if(filter){
      url = url + "/" + filter.status + "/" + filter.subStatus;
    }
    return this.http.get<OrdersToPickModel>(url)
  }

  // Get All clients
  getAllClients(searchText: string){console.log('hello',searchText);
    return this.http.post<ClientsListModel>('https://integration.ebusiness.pittsburghpublicsafety.com/api/client/find',{"searchPhrase":searchText});
  }
  
  // Get Client Details https://integration.ebusiness.pittsburghpublicsafety.com/api/client/5d55a0a8951e360004cf8d2a
  getClient(){
    return this.http.get<any>('https://integration.ebusiness.pittsburghpublicsafety.com/api/client/5d55a0a8951e360004cf8d2a')
  }
}
