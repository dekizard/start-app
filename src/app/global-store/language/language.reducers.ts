import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Translation } from './../models/translation';
import { Language } from '../models/language';
import * as languageActions from '../language/language.actions';

export interface LangState extends EntityState<Translation> {
    languages: Array<Language> | undefined,
    currentTranslationId: string | undefined,
    currentTranslation: string | undefined,
    message: string | undefined,
    loadedLanguages: boolean
}

export const translationsAdapter : EntityAdapter<Translation> =
  createEntityAdapter<Translation>();

export const initialLangState: LangState = translationsAdapter.getInitialState({
    languages: undefined,
    currentTranslationId: undefined,
    currentTranslation: undefined,
    message: undefined,
    loadedLanguages: false
});

const languageReducer = createReducer(

  initialLangState,

  on(languageActions.LoadLanguagesSuccess, (state, action) => {    

    return { ...state, languages: action.languages, loadedLanguages: true };
  }),

  on(languageActions.LoadTranslationSuccess, (state, action) => {

    return translationsAdapter.addOne(action.translation, { ...state,  currentTranslationId: action.translation.id, currentTranslation: action.translation.name });
  }),

  on(languageActions.ChangeTranslationSuccess, (state, action) => {
    
    return { ...state, currentTranslationId: action.id, currentTranslation: action.name };    
  }),  

  on(languageActions.LoadTranslationFail, (state, action) => {
    
    return { ...state, message: action.message };
  })  
 )

 export function reducer(state: LangState | undefined, action: Action) {
  return languageReducer(state, action);
}

export const {
  selectAll,
  selectEntities,
  selectIds
} = translationsAdapter.getSelectors();