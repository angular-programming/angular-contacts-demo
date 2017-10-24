import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

// const CONTACT_URL = '/assets/contacts.json';
// HttpClient不支持请求本地文件，故SSR模式下需要赋值为完整的HTTP路径
const CONTACT_URL = 'http://localhost:4200/assets/contacts.json';

let _contacts;

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  getContactsData(opts?: any) {
    let source;
    if (Array.isArray(_contacts)) {
      source = Observable.of(_contacts);
    } else {
      source = this.http.request('get', CONTACT_URL)
        .do(data => _contacts = data)
        .catch(this.handleError);
    }
    return source.map(data => this.filter(data, opts));
  }

  getContactById(id) {
    id = parseInt(id, 10);
    return this.getContactsData({ id: id });
  }

  getCollections() {
    return this.getContactsData({ collection: 1 });
  }

  addContact(obj: any = {}) {
    if (!Array.isArray(_contacts)) {
      console.error('请刷新重试');
      return;
    }
    obj.id = _contacts.length + 1;
    _contacts.push(obj);
  }

  editContact(obj: any) {
    // tslint:disable-next-line:curly
    if (!obj) return;
    if (!Array.isArray(_contacts)) {
      console.error('请刷新重试');
      return;
    }
    let idx = -1;
    for (const one of _contacts) {
      idx++;
      if (one.id === obj.id) {
        _contacts[idx] = one;
      }
    }
  }

  collectContact(obj: any = {}) {
    if (!Array.isArray(_contacts)) {
      console.error('请刷新重试');
      return;
    }
    for (const one of _contacts) {
      if (one.id === obj.id) {
        // tslint:disable-next-line:no-bitwise
        one.collection ^= 1;
        break;
      }
    }
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

  getCache() {
    return _contacts;
  }
  setCache(data) {
    _contacts = data;
  }

}
