import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetService {

  constructor() { }

  setItem(key,value) {
    if(typeof value=='object')
      value = JSON.stringify(value)
    localStorage.setItem(key,value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
  unsetUser() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      userType: '',
      roles: []
    }
  }
}
