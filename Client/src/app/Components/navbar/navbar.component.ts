import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signedIn;
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authservice.isSignedIn()) {
      this.signedIn = true
    }
  }
  logout() {
    this.authservice.logout();
  }

}
