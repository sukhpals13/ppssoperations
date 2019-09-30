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

}
