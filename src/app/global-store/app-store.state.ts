import { createFeatureSelector } from '@ngrx/store';

import * as languageReducer from './language/language.reducers';

export interface AppState {
    langState: languageReducer.LangState
}
  
export const selectAppState = createFeatureSelector<AppState>("appState");