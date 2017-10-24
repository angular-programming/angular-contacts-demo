import {
  NgModule,
  ApplicationRef,
  RendererFactory2,
  APP_BOOTSTRAP_LISTENER
} from '@angular/core';
import { PlatformState } from '@angular/platform-server';

import { ContactService } from './shared/contact.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

export function inject(
  appRef: ApplicationRef,
  contactService: ContactService,
  state: PlatformState,
  rendererFactory: RendererFactory2
) {
  return () => {
    appRef.isStable
      .filter(stable => stable)
      .first()
      .subscribe(() => {
        try {
          const document = state.getDocument();
          const renderer = rendererFactory.createRenderer(document, null);
          const head = document.head;
          if (!head) {
            throw new Error('请在文档中添加<head>标签');
          }
          const script = renderer.createElement('script');
          const cacheString = JSON.stringify(contactService.getCache());
          renderer.setValue(script, `window['__CACHE__'] = ${cacheString}`);
          renderer.appendChild(head, script);
        } catch (e) {
          console.error(e);
        }
      });
  };
}

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: inject,
      multi: true,
      deps: [ApplicationRef, ContactService, PlatformState, RendererFactory2]
    }
  ]
})
export class TransferServerModule {}
