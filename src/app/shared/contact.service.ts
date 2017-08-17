import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const CONTACT_URL = '/assets/contacts.json';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

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

  handleError(err: HttpErrorResponse) {
    let errMsg;
    if (err.error instanceof Error) {
      // 客户端错误或者网络异常，即连接还没传达到服务端
      errMsg = err.error.message;
    } else if (err.status) {
      // 服务端已经接收到请求，但返回非 200 的 HTTP 状态码
      errMsg = `${err.status} - ${err.statusText}，详细错误：${err.error}`;
    }
    console.error(errMsg); // 打印到控制台
    return Observable.throw(errMsg);
  }

  request(method: string, url: string, opts?: any) {
    return this.http.request(method, url)
      .map(data => this.filter(data, opts))
      .catch(this.handleError);
  }

  getContactsData() {
    return this.request('get', CONTACT_URL);
  }

  getContactById(id: number) {
    return this.request('get', CONTACT_URL, { id: id });
  }

  getCollections() {
    return this.request('get', CONTACT_URL, { collection: 1 });
  }

  addContact(obj: Object = {}) {
    return this.request('post', CONTACT_URL, obj);
  }
}
