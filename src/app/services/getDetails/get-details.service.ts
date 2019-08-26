import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, Response } from '../../interfaces/pages'

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  constructor(private http: HttpClient) { }

  getListNeedingPicked(){
    return this.http.get<Response>('https://integration.ebusiness.pittsburghpublicsafety.com/api/admin/order/listNeedingPicked')
  }
}
