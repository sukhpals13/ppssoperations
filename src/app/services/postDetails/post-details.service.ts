import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(
    public http: HttpClient
  ) { }

  updateProductStatusDetails(orderId, prodId, reqBody){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/itemStatusDetails/"+orderId+"/"+prodId;
    return this.http.post<any>(url,reqBody);
  }

  completeStatusUpdate(reqBody){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/statusDetails/"+reqBody.orderID;
    return this.http.post<any>(url,reqBody);
  }

}
