import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
// import { RequestOptions, ResponseContentType } from '@angular/common/http';
// import {Http, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(user) {
    // var headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth',user)
  }
  logout() {
    return this.http.post('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth/logout',{})
  }

}
