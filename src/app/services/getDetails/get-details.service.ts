import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../interfaces/orders'

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(private http: HttpClient) { }
  
  // Get orders that need to be picked
  getListNeedingPicked(){
    return this.http.get<Response>('https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/listNeedingPicked')
  }
}
