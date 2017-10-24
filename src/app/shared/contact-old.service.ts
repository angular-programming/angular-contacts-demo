/*
 * 此文件使用的是老的http模块，现已废弃不用
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const CONTACT_URL = '/assets/contacts.json';

@Injectable()
export class ContactService {
  constructor(private http: Http) {}

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // 打印到控制台
    return Observable.throw(errMsg);
  }

  filter(data, opts) {
    // tslint:disable-next-line:curly
    if (!opts) return data;
    if (opts.id) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === opts.id) {
          data = data[i];
        }
      }
    }
    if (opts.collection) {
      const temp: any = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].collection === opts.collection) {
          temp.push(data[i]);
        }
      }
      data = temp;
    }
    return data;
  }

  get(url: string, opts?: Object) {
    return this.http
      .get(url)
      .map(this.extractData)
      .map(data => this.filter(data, opts))
      .catch(this.handleError);
  }

  getContactsData() {
    return this.get(CONTACT_URL);
  }

  getContactById(id: number) {
    return this.get(CONTACT_URL, { id: id });
  }

  getCollections() {
    return this.get(CONTACT_URL, { collection: 1 });
  }

  addContact(obj: Object = {}) {
    const body = JSON.stringify(obj);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(CONTACT_URL, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
