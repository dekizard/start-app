import { Translation } from './translation';

export interface TranslationState {
    ids: number[];
    entities: { [key: string]: Translation };
}