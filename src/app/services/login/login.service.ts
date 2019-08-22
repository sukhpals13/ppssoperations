import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth',user)
  }

}
