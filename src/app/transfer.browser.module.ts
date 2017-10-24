import { NgModule } from '@angular/core';
import { ContactService } from './shared/contact.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [ContactService]
})
export class TransferBrowserModule {
  constructor(contactService: ContactService) {
    if (window['__CACHE__']) {
      contactService.setCache(window['__CACHE__']);
    }
  }
}
