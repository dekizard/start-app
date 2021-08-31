import { createSelector } from '@ngrx/store';

import * as fromAppState from '../app-store.state';
import { selectAll, selectEntities, selectIds } from './language.reducers';

export const selectLangState = createSelector(
    fromAppState.selectAppState,
    state => state.langState
)

export const selectLanguages = createSelector(
    selectLangState,
    state => state.languages
);

export const selectLanguagesLoaded = createSelector(
    selectLangState,
    state => state.loadedLanguages
);

export const selectTranslationsIds = createSelector(
    selectLangState,
    selectIds
)

export const selectTranslationEntities = createSelector(
    selectLangState,
    selectEntities
);

export const selectAllTranslations = createSelector(
    selectLangState,
    selectAll
);

export const selectCurrentTranslationId = createSelector(
    selectLangState,
    state => state.currentTranslationId
);

export const selectCurrentTranslationName = createSelector(
    selectLangState,
    state => state.currentTranslation
);

export const selectTranslationById = (id: string) => createSelector(
    selectTranslationEntities,
    (entities) => entities[id]
);

export const selectTranslationMessage = createSelector(
    selectLangState,
    state => state.message
);

