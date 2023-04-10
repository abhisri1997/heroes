import { Action } from '@ngrx/store';

import { Hero, IHero } from '../../hero/hero-entity/hero.model';

export const Add_Hero = 'Add_Hero';
export const Update_Hero = 'Update_Hero';
export const Delete_Hero = 'Delete_Hero';

export class AddHero implements Action {
  readonly type = Add_Hero;
  constructor(public payload: Hero) {}
}

export class UpdateHero implements Action {
  readonly type = Update_Hero;
  constructor(public payload: IHero) {}
}

export class DeleteHero implements Action {
  readonly type = Delete_Hero;
  constructor(public payload: number) {}
}

export type HeroActions = AddHero | UpdateHero | DeleteHero;
