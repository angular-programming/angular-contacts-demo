import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isListPage = true;

  constructor(private _location: Location) {}

  ngOnInit() {
    this.isListPage =
      !this._location.path() ||
      this._location.path().indexOf('/list') > -1;
  }
}
