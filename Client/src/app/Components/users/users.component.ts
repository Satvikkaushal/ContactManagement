import { AE, user } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { AN, User } from 'src/app/user.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: user[];
  Numbers: AN[];
  Emails: AE[];
  alternateEmail: AE = new AE();
  alternateNumber: AN = new AN();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    return this.dataService.getUsers()
      .subscribe(data => { this.users = data; console.log(this.users) })
  }

  getAdditionalInfo(userId) {
    this.dataService.getAdditionalNumbers(userId).subscribe(data => { this.Numbers = data; console.log(data) });
    this.dataService.getAdditionalEmails(userId).subscribe(data => { this.Emails = data; console.log(data) });
    this.dataService.getuserById(userId).subscribe(data => { this.user = data; console.log(data) });
  }


  updateContact(userid) {
    if (this.alternateNumber.Number) {
      this.alternateNumber.id = userid;
      this.dataService.updateContact(this.alternateNumber)
      this.alternateNumber.Number = ""
    }
    if (this.alternateEmail.email) {
      this.alternateEmail.id = userid;
      this.dataService.updateContact(this.alternateEmail)
      this.alternateEmail.email = ""
    }
  }

}
