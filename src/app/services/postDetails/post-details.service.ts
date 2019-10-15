import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../default';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(
    public http: HttpClient
  ) { }

  // update status of products in order
  updateProductStatusDetails(orderId, prodId, reqBody){
    let url = config.hostName+"/api/admin/order/itemStatusDetails/"+orderId+"/"+prodId;
    return this.http.post<any>(url,reqBody);
  }

  // update status of order
  completeStatusUpdate(reqBody){
    let url = config.hostName+"/api/admin/order/statusDetails/"+reqBody.orderID;
    return this.http.post<any>(url,reqBody);
  }

  // create client
  createClient(reqBody){
    let url = config.hostName+"/api/client",
    request = {client:reqBody}
    return this.http.put<any>(url,request);
  }

  addAssignment(clientId,assignment){
    let url = config.hostName+"/api/client/assignment/"+clientId;
    return this.http.put<any>(url,{name:assignment})
  }

  addRank(clientId,rank){
    let url = config.hostName+"/api/client/rank/"+clientId;
    return this.http.put<any>(url,{name:rank})
  }
  
  updateBillingInfo(clientId,reqBody){
    let url = config.hostName+"/api/client/updateBilling/"+clientId;
    return this.http.post<any>(url,reqBody)
  }

  updateClient(client){
    console.log(client);
    let url = config.hostName+"/api/client/"+client._id;
    return this.http.post<any>(url,client);
  }

  addPickupLocation(clientId,pickupLocation){
    let url = config.hostName+"/api/client/pickupLocation/"+clientId;
    return this.http.put<any>(url,{name:pickupLocation})
  }

  addDeliveryLocation(clientId,deliveryLocation){
    let url = config.hostName+"/api/client/deliveryLocation/"+clientId;
    return this.http.put<any>(url,{name:deliveryLocation})
  }

  addClientContact(clientId,contact){
    let url = config.hostName+"/api/client/contact/"+clientId;
    return this.http.put<any>(url,contact)
  }

  updateClientContact(clientId,contact){
    let url = config.hostName+"/api/client/contact/"+clientId;
    return this.http.post<any>(url,contact)
  }

  addClientUserRole(clientId,role){
    let url = config.hostName+"/api/client/clientUserRoles/"+clientId;
    return this.http.put<any>(url,role)
  }

  updateClientUserRole(clientId,role){
    let url = config.hostName+"/api/client/clientUserRoles/"+clientId+"/"+role._id;
    return this.http.post<any>(url,role)
  }

  // add client user group
addClientUserGroup(clientId,name){
  let url = config.hostName+"/api/client/clientUserGroups/"+clientId;
  return this.http.put<any>(url,name)
  }
  
  // Update client user group
  updateClientUserGroup(clientId,groupId,name){
  let url = config.hostName+"/api/client/clientUserGroups/"+clientId+'/'+groupId;
  return this.http.post<any>(url,name)
  }

  // Update user details
  updateUser(userId,postBody){
    let url = config.hostName+"/api/user/update/"+userId;
    return this.http.post<any>(url,postBody)
    }

}
