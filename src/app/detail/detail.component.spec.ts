import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../shared/contact.service';

import { DetailComponent } from './detail.component';
import { RouterLinkStubDirective, RouterStubService, ActivatedRouteStubService } from '../../testing';
import { PhonePipe } from '../shared/phone.pipe';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
class FakeContactService {
  getContactById(id: any): Observable<any> {
    return Observable.of(1);
  }
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,
        PhonePipe,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: Router, useClass: RouterStubService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStubService },
        { provide: ContactService, useClass: FakeContactService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
