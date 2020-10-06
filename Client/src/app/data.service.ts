import { environment } from './../environments/environment';
import { AuthService } from './auth.service';

import { User, AN, AE, user } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';



export class contact {
  constructor(
  ) { }
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

  BaseUrl = environment.BaseAPiUrl;

  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  user = this.authService.isSignedIn();
  msg: any;

  getUsers() {

    return this.http.get<User[]>(this.BaseUrl + "/alluser", {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.user.token
      })
    });
  }

  getuserById(userId) {

    return this.http.get<user[]>(this.BaseUrl + "/user/" + userId, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.user.token
      })
    });
  }

  getAdditionalNumbers(userId) {

    return this.http.get<AN[]>(this.BaseUrl + "/user/numbers/" + userId, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.user.token
      })
    });
  }
  getAdditionalEmails(userId) {

    return this.http.get<AE[]>(this.BaseUrl + "/user/emails/" + userId, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.user.token
      })
    });
  }

  createContact(contacts) {
    return this.http.post(this.BaseUrl + "/addContact", contacts,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.user.token
        })
      }).subscribe(
        res => console.log(res),
        err => console.log(err))
  }

  updateContact(updatedContacts) {
    return this.http.post(this.BaseUrl + "/updateContact", updatedContacts,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.user.token
        })
      }).subscribe(
        res => console.log(res),
        err => console.log(err))
  }

  signIn(credentials) {
    return this.http.post(this.BaseUrl + "/signIn", credentials,
      { headers: this.headers }).subscribe(
        res => {
          this.msg = res;
          console.log(this.msg.msg)
          if (res.hasOwnProperty("token")) {
            alert("sign in Sucessful")
            if (typeof window !== "undefined") {
              localStorage.setItem("userToken", JSON.stringify(res))
            }
          }
          if (res.hasOwnProperty("msg")) {
            alert("passowrd mismatch")
          }
          if (res.hasOwnProperty("details")) {
            alert(this.msg.details)
          }
        },
        err => { alert("user not found, please sign up") })
  }



  signUp(credentials) {
    return this.http.post(this.BaseUrl + "/signUp", credentials,//update link for sending requested
      { headers: this.headers }).subscribe(
        res => {
          if (res.hasOwnProperty("success")) {
            alert("Sign up Sucess full please login")
            this.router.navigate(['signIn'])
          }
          if (res.hasOwnProperty("errorMessage")) {
            alert("sign up failed");
          }
          if (res.hasOwnProperty("details")) {
            alert("enter proper email")
          }
        },
        err => { alert("Unable to signUp, please retry !!") })
  }
}
