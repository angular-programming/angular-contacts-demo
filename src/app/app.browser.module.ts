import { NgModule } from '@angular/core';
import { BrowserPrebootModule } from 'preboot/browser';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TransferBrowserModule } from './transfer.browser.module';

@NgModule({
  imports: [
    AppModule,
    BrowserPrebootModule.replayEvents(),
    TransferBrowserModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppBrowserModule {}
