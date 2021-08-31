import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as languageReducer from './language/language.reducers';
import { LanguageEffects } from './language/language.effects';
import * as LanguageSelectors from './language/language.selectors';
import { AppState } from './app-store.state';

export const effects: any[] = [LanguageEffects];
export const reducers: ActionReducerMap<AppState> = {
  langState: languageReducer.reducer
}

export { LanguageSelectors };
