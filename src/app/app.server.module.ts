import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ServerPrebootModule } from 'preboot/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule, // 导入客户端根模块
    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'app-root' }),
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppServerModule {}
