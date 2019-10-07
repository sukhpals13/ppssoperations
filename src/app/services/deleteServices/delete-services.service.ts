import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteServicesService {

  constructor(
    public http: HttpClient
  ) { }

  deleteAssignment(clientId,assignment){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/assignment/"+clientId;
    return this.http.request<any>('delete',url,{body:{name:assignment}})
  }

  deleteRank(clientId,rank){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/rank/"+clientId;
    return this.http.request<any>('delete',url,{body:{name:rank}})
  }

  deletePickupLocation(clientId,pickupLocation){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/pickupLocation/"+clientId;
    return this.http.request<any>('delete',url,{body:{name:pickupLocation}})
  }

  deleteDeliveryLocation(clientId,deliveryLocation){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/deliveryLocation/"+clientId;
    return this.http.request<any>('delete',url,{body:{name:deliveryLocation}})
  }

  deleteClientContact(clientId,contactId){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/contact/"+clientId;
    return this.http.request<any>('delete',url,{body:{contactId:contactId}})
  }

}
