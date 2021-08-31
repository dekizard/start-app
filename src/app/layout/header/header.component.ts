import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Language } from './../../global-store/models/language';
import { Localization } from 'src/app/core/services/localization';
import { AppState } from 'src/app/global-store/app-store.state';
import * as languageActions from '../../global-store/language/language.actions';
import * as languageSelectors from '../../global-store/language/language.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLang = false;
  languages$: Observable<Array<Language> | undefined>;
  currentTranslationId: string | undefined;
  currentTranslationName: string | undefined;

  constructor(public localization: Localization, private store: Store<AppState>) {
    
    this.languages$ = this.store.select(languageSelectors.selectLanguages);
    
    this.store.select(languageSelectors.selectCurrentTranslationId)
       .subscribe(translationId => {
          this.currentTranslationId = translationId;
    });

    this.store.select(languageSelectors.selectCurrentTranslationName)
       .subscribe(translation => {
         this.currentTranslationName = translation;
 });
  }

  ngOnInit(): void {}

  toggleLang(): void {
    this.showLang = !this.showLang;  
  }  

  changeLanguage(item: Language) {
    const id = item.id;    
    
    if (this.currentTranslationId !== id) {
      this.store.dispatch(languageActions.LoadLanguagesByTypeInitialize({langType: id}));          
      this.store.select(languageSelectors.selectTranslationById(id)).pipe(first())
        .subscribe(translation => {
            if (translation == undefined) {
                this.store.dispatch(languageActions.LoadTranslationInitialize({id}));                
            }
            else {
                this.store.dispatch(languageActions.ChangeTranslationInitialize({id}));
            }
        })
    }

    this.toggleLang();
  }
}
