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
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/client/"+client._id;
    return this.http.post<any>(url,client)
  }

  // /api/client/updateBilling/5d40606c480c470004320f76

}
