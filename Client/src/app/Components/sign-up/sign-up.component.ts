import { signUp } from './../../user.model';
import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: signUp = new signUp();
  confirmpassword: string;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
  }

  SignUp() {
    if (this.confirmpassword == this.signUpForm.password) {
      this.dataservice.signUp(this.signUpForm)
    }
    else {
      alert("Both should have same password")
      window.location.reload()
    }
  }

}
