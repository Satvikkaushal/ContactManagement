import { AuthService } from './auth.service';

import { User, AN, AE, user } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class contact {
  constructor(
  ) { }
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

  BaseUrl = "http://localhost:4000/api"
  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })

  constructor(private http: HttpClient, private authService: AuthService) { }

  user = this.authService.isSignedIn();

  getUsers() {

    return this.http.get<User[]>(this.BaseUrl + "/alluser");
  }

  getuserById(userId) {

    return this.http.get<user[]>(this.BaseUrl + "/user/" + userId);
  }

  getAdditionalNumbers(userId) {

    return this.http.get<AN[]>(this.BaseUrl + "/user/numbers/" + userId);
  }
  getAdditionalEmails(userId) {

    return this.http.get<AE[]>(this.BaseUrl + "/user/emails/" + userId);
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
    console.log("updtate")
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
    console.log("came")
    return this.http.post(this.BaseUrl + "/signIn", credentials,
      { headers: this.headers }).subscribe(
        res => {
          console.log(res)
          if (res.hasOwnProperty("token")) {
            if (typeof window !== "undefined") {
              localStorage.setItem("userToken", JSON.stringify(res))
            }
          }
          if (res.hasOwnProperty("msg")) {
            alert("password mismatch")
          }
          if (res.hasOwnProperty("details")) {
            alert("enter proper email")
          }
        },
        err => { console.log(err); alert("please retry in some time") })
  }



  signUp(credentials) {
    return this.http.post(this.BaseUrl + "/signUp", credentials,//update link for sending requested
      { headers: this.headers }).subscribe(
        res => {
          console.log(res);
          if (res.hasOwnProperty("success")) {
            alert("Sign up Sucess full please login")
          }
          if (res.hasOwnProperty("errorMessage")) {
            alert("sign up failed");
          }
          if (res.hasOwnProperty("details")) {
            alert("enter proper email")
          }
        },
        err => { console.log(err); alert("please retry in some time") })
  }
}
