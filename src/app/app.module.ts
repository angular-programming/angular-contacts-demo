import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import {HttpModule} from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CollectionComponent } from './collection';
import { ListComponent, ListItemComponent } from './list';
import { DetailComponent } from './detail';
import { EditComponent } from './edit';

import {
  ContactService,
  UtilService,
  FooterComponent,
  HeaderComponent,
  PhonePipe,
  BtnClickDirective
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    DetailComponent,
    CollectionComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    PhonePipe,
    BtnClickDirective
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'angular-contacts-demo'
    }),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ContactService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule {}
