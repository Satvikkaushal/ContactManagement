import { Component, OnInit } from '@angular/core';
import { contact } from './../../data.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css']
})
export class AddContactFormComponent implements OnInit {
  contact: contact = new contact();
  show = false;
  constructor(private dataService: DataService) { }


  ngOnInit() {
  }

  saveContact() {
    console.log(this.contact)
    this.dataService.createContact(this.contact)
    this.show = false;
    window.location.reload();
  }

  contactForm() {
    this.show = true;
  }
  HidecontactForm() {
    this.show = false;
  }

}
