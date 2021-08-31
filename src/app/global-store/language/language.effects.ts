import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Translation } from './../models/translation';
import { LanguageService } from './../services/language.service';
import { Language } from './../models/language';
import * as languageActions from '../language/language.actions';

@Injectable()
export class LanguageEffects {

  constructor(public languageService: LanguageService, private actions$: Actions) {
  }

  loadLanguages$ = createEffect(
    () => this.actions$.pipe(
    ofType(languageActions.LoadLanguagesInitialize),
    switchMap(() => {
      return this.languageService.getLanguagesDefault().pipe(
        map((languages: Array<Language>) => {
          return languageActions.LoadLanguagesSuccess({languages});
        })
      );
    })
  ));

  loadLanguagesByType$ = createEffect(
    () => this.actions$.pipe(
    ofType(languageActions.LoadLanguagesByTypeInitialize),
    switchMap((action) => {
      return this.languageService.getLanguagesByType(action.langType).pipe(
        map((languages: Array<Language>) => {
          return languageActions.LoadLanguagesSuccess({languages});
        })
      );
    })
  ));

  loadTranslation$ = createEffect(
    () => this.actions$.pipe(
    ofType(...[languageActions.LoadTranslationDefaultInitialize, languageActions.LoadTranslationInitialize]),
    switchMap((action) => {
      return this.languageService.getLanguageTranslation(action.id).pipe(
        map((result: any) => {
          const translation : Translation = {
            id: action.id,            
            name: this.languageService.getLanguageNameByType(action.id),
            data: result
          };
          return languageActions.LoadTranslationSuccess({translation});
        }),
        catchError(() => {
          return of(languageActions.LoadTranslationFail({message: 'Cannot load language translation.'}));
        })
      );
    })
  ));

  changeTranslation$ = createEffect(
    () => this.actions$.pipe(
    ofType(languageActions.ChangeTranslationInitialize),
    map((action) => {
      const translationName = this.languageService.getLanguageNameByType(action.id);
      return languageActions.ChangeTranslationSuccess({id: action.id, name: translationName});
    })
  ));
}
