import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { LangState } from '../../global-store/language/language.reducers';
import * as languageActions from '../../global-store/language/language.actions';
import * as languageSelectors from '../../global-store/language/language.selectors';
import { Localization } from './localization';

@Injectable({ providedIn: 'root' })
export class LocalizationService extends Localization {
  constructor(private store: Store<LangState>) {
    super();
  }

  load(): Promise<any> {

    return new Promise((resolve, reject) => {

    this.store.dispatch(languageActions.LoadLanguagesInitialize());          

    this.store.select(languageSelectors.selectLangState)
      .pipe(filter(state => state.currentTranslationId === undefined))
      .subscribe((state) => {
        const language = state.languages?.find(t => t.default);
        this.store.dispatch(languageActions.LoadTranslationDefaultInitialize({ id: language?.id }));        
    });
      
    this.store.select(languageSelectors.selectCurrentTranslationId)
      .pipe(filter(id => id !== undefined))
      .subscribe(id => {           
            this.store.select(languageSelectors.selectTranslationById(id!))
            .subscribe(traslation => {
                this.translation = traslation?.data;
                resolve(true);
            });
      });
    });      
  }
}
