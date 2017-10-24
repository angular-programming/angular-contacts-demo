import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../shared/contact.service';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isAdd: boolean;
  operateTitle: string;
  editId: number;
  contacts: any = {};
  contact: any = {};
  isName = false;
  isPhoneNum = false;
  isAddr = false;
  isEmail = false;
  isBir = false;
  nameTip = false;
  phoneTip = false;
  addrTip = false;
  emailTie = false;
  birTip = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _constactService: ContactService,
    private _location: Location,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.getContacts();
    this._activatedRoute.params.subscribe(params => {
      // this.isAdd = params['isAdd'];
      this.editId = params['id'];
      this.isAdd = !this.editId;
    });
    this.operateTitle = this.isAdd ? '新建联系人' : '编辑联系人';
    //
    if (!this.isAdd) {
      this.getContactDetailById(this.editId);
      this.isName = this.isPhoneNum = this.isAddr = this.isEmail = this.isBir = true;
    }
  }

  submitForm() {
    this.nameTip = true;
    this.phoneTip = true;
    this.addrTip = true;
    this.emailTie = true;
    this.birTip = true;

    if (
      this.isName &&
      this.isPhoneNum &&
      this.isAddr &&
      this.isEmail &&
      this.isBir
    ) {
      if (this.isAdd) {
        this.addContact();
      } else {
        this.editContact();
      }
    }
  }
  getContacts() {
    this._constactService.getContactsData().subscribe(data => {
      this.contacts = data;
    });
  }

  getContactDetailById(id: number) {
    this._constactService.getContactById(id).subscribe(data => {
      this.contact = data;
    });
  }

  addContact() {
    const newContact = {
      name: this.contact.name,
      telNum: this.contact.telNum,
      address: this.contact.address,
      email: this.contact.email,
      birthday: this.contact.birthday,
      collection: 0
    };
    this._constactService.addContact(newContact);
    this._router.navigate(['']);
  }

  editContact() {
    const editContact = {
      id: this.editId,
      name: this.contact.name,
      telNum: this.contact.telNum,
      address: this.contact.address,
      email: this.contact.email,
      birthday: this.contact.birthday,
      collection: 0
    };
    this._constactService.editContact(editContact);
    this._router.navigate(['/list', this.editId]);
  }

  cancleOperate() {
    this._location.back();
  }

  // 失去焦点事件
  onBlurName() {
    this.nameTip = true;
    this.isName = this.contact.name ? true : false;
  }
  onBlurPhone() {
    this.phoneTip = true;
    this.isPhoneNum = this.util.checkPhoneNum(this.contact.telNum);
  }
  onBlurAddr() {
    this.addrTip = true;
    this.isAddr = this.contact.address ? true : false;
  }
  onBlurEmail() {
    this.emailTie = true;
    this.isEmail = this.util.checkEmail(this.contact.email);
  }
  onBlurBir() {
    this.birTip = true;
    this.isBir = this.contact.birthday ? true : false;
  }
}
