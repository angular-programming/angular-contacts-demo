import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerPrebootModule } from 'preboot/server';

import { AppModule } from './app.module';
import { TransferServerModule } from './transfer.server.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule, // 导入客户端根模块
    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'app-root' }),
    TransferServerModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppServerModule {}
