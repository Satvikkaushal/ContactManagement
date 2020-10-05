import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isSignedIn() {
    if (typeof window == undefined) {
      return (false);
    }
    if (localStorage.getItem("userToken")) {
      return JSON.parse(localStorage.getItem("userToken"));
    }
    else {
      return false;
    }
  }

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userToken")
    }
  }
}
