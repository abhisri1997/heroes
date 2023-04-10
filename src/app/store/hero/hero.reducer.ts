import { Hero } from 'src/app/hero/hero-entity/hero.model';
import * as HeroActions from './hero.action';

export interface HeroState {
  heroes: Array<Hero>;
}

export const initialState: HeroState = {
  heroes: [
    new Hero(1, 'Captain America', 'blue'),
    new Hero(2, 'Naruto'),
    new Hero(3, 'Saitama'),
    new Hero(4, 'Sasuke'),
    new Hero(5, 'Itachi'),
    new Hero(6, 'Kakashi'),
  ],
};

export const heroReducer = (
  state = initialState,
  action: HeroActions.HeroActions
) => {
  switch (action.type) {
    case HeroActions.Add_Hero:
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case HeroActions.Update_Hero:
      const heroToUpdate = state.heroes[action.payload.id - 1];
      const updatedHero = {
        ...heroToUpdate,
        ...action.payload,
      };
      const updatedHeroes = [...state.heroes];
      updatedHeroes[action.payload.id - 1] = updatedHero;
      return {
        ...state,
        heroes: updatedHeroes,
      };
    case HeroActions.Delete_Hero:
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };
    default:
      return state;
  }
};
