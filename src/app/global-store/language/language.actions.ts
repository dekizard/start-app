import { createAction, props } from '@ngrx/store';

import { Translation } from './../models/translation';
import { Language } from '../models/language';

const TYPE = "TYPE"

export const LoadLanguagesInitialize = createAction(
  `${TYPE} Load Languages Initialize`
)

export const LoadLanguagesByTypeInitialize = createAction(
  `${TYPE} Load Languages By Type Initialize`,
  props<{ langType: string }>()
)

export const LoadLanguagesSuccess = createAction(
  `${TYPE} Load Languages Success`,
  props<{ languages: Array<Language> }>()
)

export const LoadTranslationDefaultInitialize = createAction(
  `${TYPE} Load Translation Default Initialize`,
  props< {id: string | undefined}>()
)

export const LoadTranslationInitialize = createAction(
  `${TYPE} Load Translation Initialize`,
  props< {id: string | undefined}>()
)

export const LoadTranslationSuccess = createAction(
  `${TYPE} Load Translation Success`,
  props<{ translation: Translation }>()
)

export const LoadTranslationFail = createAction (
  `${TYPE} Load Translation Fail`,
  props<{ message: string }>()
)

export const ChangeTranslationInitialize = createAction (
  `${TYPE} Change Translation`,
  props< {id: string | undefined}>()
)

export const ChangeTranslationSuccess = createAction (
  `${TYPE} Change Translation Success`,
  props< {id: string | undefined; name: string | undefined}>()
)
 