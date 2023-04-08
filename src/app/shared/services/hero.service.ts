import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hero, IHero } from 'src/app/hero/hero-entity/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroesList: ReadonlyArray<Hero> = [
    new Hero(1, 'Captain America'),
    new Hero(2, 'Naruto'),
    new Hero(3, 'Saitama'),
    new Hero(4, 'Sasuke'),
    new Hero(5, 'Itachi'),
    new Hero(6, 'Kakashi'),
  ];

  constructor() {}

  heroesUpdated = new Subject<ReadonlyArray<Hero>>();

  getNewHeroId(): number {
    const numberOfHeroes = this.getHeroes().length;
    const lastHeroId =
      numberOfHeroes === 0 ? 0 : this.getHeroes()[numberOfHeroes - 1].id;
    return lastHeroId + 1;
  }

  getHeroes(): ReadonlyArray<Hero> {
    return this.heroesList.slice();
  }

  getHero(heroId: number): Hero | undefined {
    return this.getHeroes().find((hero) => hero.id === heroId);
  }

  addHero(heroName: string): number {
    const newHeroId = this.getNewHeroId();
    const newHero = new Hero(newHeroId, heroName);
    this.heroesList = [...this.heroesList, newHero];
    this.heroesUpdated.next(this.getHeroes());
    return newHeroId;
  }

  updateHero(hero: IHero): void {
    const heroToUpdate = this.getHero(hero.id);
    if (heroToUpdate) {
      heroToUpdate.name = hero.name;
    }
    this.heroesUpdated.next(this.getHeroes());
  }

  deleteHero(heroId: number): void {
    this.heroesList = this.getHeroes().filter((hero) => hero.id !== heroId);
    this.heroesUpdated.next(this.getHeroes());
  }

  searchHeroes(searchTerm: string): ReadonlyArray<Hero> {
    return this.getHeroes().filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
