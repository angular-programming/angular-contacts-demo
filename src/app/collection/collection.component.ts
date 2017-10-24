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
    this._constactService.getCollections().subscribe(data => {
      this.collections = data;
    });
  }

  ngOnInit() {
    this.getCollectionContact();
  }
}
