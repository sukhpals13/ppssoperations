import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
// import { RequestOptions, ResponseContentType } from '@angular/common/http';
// import {Http, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  // Login
  login(user) {
    return this.http.post('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth',user)
  }

  // Logout
  logout() {
    return this.http.post('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth/logout',{})
  }

}
