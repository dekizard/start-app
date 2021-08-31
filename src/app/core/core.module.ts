import { Observable } from 'rxjs';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LocalizationService } from './services/localization.service';
import { Localization } from './services/localization';

export function loadLocalization(localization: LocalizationService): () => Promise<any> {
  return () => localization.load();
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: Localization,
      deps: [Store],
      useExisting: LocalizationService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadLocalization,
      deps: [LocalizationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
