import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.isSignedIn()
    console.log(this.user)
  }

}
