import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collections: any = [];
  contacts: any = {};

  constructor(private _constactService: ContactService) {}

  getCollectionContact() {
    const ss_contacts = sessionStorage.getItem('contacts');
    if (ss_contacts) {
      this.contacts = JSON.parse(ss_contacts);
      for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].collection === 1) {
          this.collections.push(this.contacts[i]);
        }
      }
    } else {
      this._constactService.getCollections().subscribe(data => {
        this.collections = data;
      });
    }
  }

  ngOnInit() {
    this.getCollectionContact();
  }
}
