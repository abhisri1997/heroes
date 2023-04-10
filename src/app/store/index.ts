import { ActionReducerMap } from '@ngrx/store';
import { HeroState, heroReducer } from './hero/hero.reducer';
import { HeroActions } from './hero/hero.action';

export interface AppState {
  hero: HeroState;
}

export const appReducer: ActionReducerMap<AppState, HeroActions> = {
  hero: heroReducer,
};
