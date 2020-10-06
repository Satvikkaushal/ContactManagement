import { AuthService } from './../../auth.service';
import { DataService } from 'src/app/data.service';
import { signIn } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInfForm: signIn = new signIn();

  constructor(private route: ActivatedRoute, private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("ng on it")
    if (this.authService.isSignedIn()) {
      this.router.navigate(['/users']);
    }
  }
  async signIn() {

    console.log(this.signInfForm)
    await this.dataService.signIn(this.signInfForm);
    window.location.reload()
  }

}
