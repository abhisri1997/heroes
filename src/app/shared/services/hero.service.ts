import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Hero, IHero } from 'src/app/hero/hero-entity/hero.model';
import * as HeroActions from 'src/app/hero/store/hero.action';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroesList: Hero[] = [];

  constructor(private heroStore: Store<{ hero: { heroes: Array<Hero> } }>) {
    this.heroStore.select('hero').subscribe((hero) => {
      this.heroesList = hero.heroes;
    });
  }

  heroesUpdated = new Subject<Array<Hero>>();

  getNewHeroId(): number {
    const numberOfHeroes = this.getHeroes().length;
    const lastHeroId =
      numberOfHeroes === 0 ? 0 : this.getHeroes()[numberOfHeroes - 1].id;
    return lastHeroId + 1;
  }

  getHeroes(): Array<Hero> {
    return this.heroesList.slice();
  }

  getHero(heroId: number): Hero | undefined {
    return this.getHeroes().find((hero) => hero.id === heroId);
  }

  addHero(heroName: string, heroColor?: string): number {
    const newHeroId = this.getNewHeroId();
    let newHero: Hero;
    if (heroColor) {
      newHero = new Hero(newHeroId, heroName, heroColor);
    } else {
      newHero = new Hero(newHeroId, heroName);
    }
    this.heroesList = [...this.heroesList, newHero];
    this.heroesUpdated.next(this.getHeroes());
    return newHeroId;
  }

  updateHero(hero: IHero): void {
    this.heroStore.dispatch(new HeroActions.UpdateHero(hero));
  }

  deleteHero(heroId: number): void {
    this.heroesList = this.getHeroes().filter((hero) => hero.id !== heroId);
    this.heroesUpdated.next(this.getHeroes());
  }

  searchHeroes(searchTerm: string): Array<Hero> {
    return this.getHeroes().filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
