import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ActivatedRouteStubService {
  params: Observable<any> = Observable.of({});
}
