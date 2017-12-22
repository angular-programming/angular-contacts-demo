import { NgModule } from '@angular/core';
import { BrowserPrebootModule } from 'preboot/browser';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    BrowserPrebootModule.replayEvents(),
    BrowserTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppBrowserModule {}
