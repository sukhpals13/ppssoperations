import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userResposne } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  // Login
  login(user) {
    return this.http.post<userResposne>('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth',user)
  }

  // Logout
  logout() {
    return this.http.post('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth/logout',{})
  }

  // Session Check
  // sessionCheck() {
  //   return this.http.get<userResposne>('https://integration.ebusiness.pittsburghpublicsafety.com/api/auth/me')
  // }

  // sessionCheckedOn(str) {
  //   let token = localStorage.getItem('token');
  //   if (token) {
  //     this.sessionCheck()
  //     .subscribe(res => {
  //       console.log(res, 'logged in');
  //       console.log(this.router.url);
  //       if(str=='login')
  //         this.router.navigate(['app/categories']);  
  //     },
  //     err => {
  //       console.log(err, 'not logged in');
  //       if(str!='login')
  //         this.router.navigate(['auth/login']);
  //     })
  //   }else{
  //     if(str!='login')
  //       this.router.navigate(['auth/login']);
  //   }
  // }
}
