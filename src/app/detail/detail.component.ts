import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  contact_id: number;
  detail: any = {};
  contacts: any = {};
  private sub: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _constactService: ContactService
  ) {}

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.contact_id = params['id'];
      this.getById(this.contact_id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editContact() {
    this._router.navigate(['/edit', this.contact_id]);
  }

  collectTheContact() {
    this.detail.collection === 0
      ? (this.detail.collection = 1)
      : (this.detail.collection = 0);
    const ss_contacts = sessionStorage.getItem('contacts');
    this.contacts = JSON.parse(ss_contacts);
    this.contacts[this.contact_id - 1].collection = this.detail.collection;
    sessionStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  getById(id: number) {
    const ss_contacts = sessionStorage.getItem('contacts');
    if (ss_contacts) {
      this.contacts = JSON.parse(ss_contacts);
      this.detail = this.contacts[id - 1];
    } else {
      this._constactService.getContactById(id).subscribe(data => {
        this.detail = data;
      });
    }
  }
}
