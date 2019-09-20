import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(
    public http: HttpClient
  ) { }

  updateProductStatusDetails(orderId, prodId, status, subStatus){
    let url ="https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/itemStatusDetails/"+orderId+"/"+prodId;
    return this.http.post<any>(url,{status:status, subStatus:subStatus});
  }
}
