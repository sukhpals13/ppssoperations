import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrdersToPickModel } from '../../interfaces/order';
import { ClientsListModel } from '../../interfaces/clients';
import { UsersListModel } from '../../interfaces/user';

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
  getAllClients(phrase){
    return this.http.post<ClientsListModel>('https://integration.ebusiness.pittsburghpublicsafety.com/api/client/find',{"searchPhrase":phrase});
  }
  
  // Get Client Details https://integration.ebusiness.pittsburghpublicsafety.com/api/client/5d55a0a8951e360004cf8d2a
  getClient(id){
    let url = 'https://integration.ebusiness.pittsburghpublicsafety.com/api/client/'+id
    return this.http.get<any>(url)
  }

  getAllUsers(phrase){
    return this.http.post<UsersListModel>('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth/find', {"searchPhrase":phrase})
  }

  // Get Client Details https://integration.ebusiness.pittsburghpublicsafety.com/api/client/5d55a0a8951e360004cf8d2a
  getUser(id){
    let url = 'https://integration.ebusiness.pittsburghpublicsafety.com/api/auth/'+id
    return this.http.get<any>(url)
  }

  // get cklient use role
  getClientUserRoles(id){
    let url = 'https://integration.ebusiness.pittsburghpublicsafety.com/api/client/clientUserRoles/'+id;
    return this.http.get<any>(url)
  }
  // get cklient use role
  getClientUserGroups(id){
    let url = 'https://integration.ebusiness.pittsburghpublicsafety.com/api/client/clientUserGroups/'+id;
    return this.http.get<any>(url)
  }
}
