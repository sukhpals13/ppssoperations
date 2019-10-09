import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(
    public http: HttpClient
  ) { }

  // update status of products in order
  updateProductStatusDetails(orderId, prodId, reqBody){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/itemStatusDetails/"+orderId+"/"+prodId;
    return this.http.post<any>(url,reqBody);
  }

  // update status of order
  completeStatusUpdate(reqBody){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/statusDetails/"+reqBody.orderID;
    return this.http.post<any>(url,reqBody);
  }

  // create client
  createClient(reqBody){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client",
    request = {client:reqBody}
    return this.http.put<any>(url,request);
  }

  addAssignment(clientId,assignment){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/assignment/"+clientId;
    return this.http.put<any>(url,{name:assignment})
  }

  addRank(clientId,rank){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/rank/"+clientId;
    return this.http.put<any>(url,{name:rank})
  }
  
  updateBillingInfo(clientId,reqBody){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/updateBilling/"+clientId;
    return this.http.post<any>(url,reqBody)
  }

  updateClient(client){
    console.log(client);
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/"+client._id;
    return this.http.post<any>(url,client);
  }

  addPickupLocation(clientId,pickupLocation){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/pickupLocation/"+clientId;
    return this.http.put<any>(url,{name:pickupLocation})
  }

  addDeliveryLocation(clientId,deliveryLocation){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/deliveryLocation/"+clientId;
    return this.http.put<any>(url,{name:deliveryLocation})
  }

  addClientContact(clientId,contact){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/contact/"+clientId;
    return this.http.put<any>(url,contact)
  }

  updateClientContact(clientId,contact){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/contact/"+clientId;
    return this.http.post<any>(url,contact)
  }

  addClientUserRole(clientId,role){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/clientUserRoles/"+clientId;
    return this.http.post<any>(url,role)
  }

  updateClientUserRole(clientId,role){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/clientUserRoles/"+clientId;
    return this.http.put<any>(url,role)
  }

  addClientUserGroup(clientId,group){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/clientUserGroups/"+clientId;
    return this.http.post<any>(url,group)
  }

  updateClientUserGroup(clientId,group){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/clientUserGroups/"+clientId;
    return this.http.put<any>(url,group)
  }

}
