import { Component } from '@angular/core';

import { HeroService } from 'src/app/shared/services/hero.service';
import { Hero } from '../hero-entity/hero.model';

@Component({
  selector: 'hero-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent {
  searchTerm: string = '';
  heroes: Array<Hero> = [];

  constructor(private heroService: HeroService) {}

  searchHeroes(): void {
    if (this.searchTerm.trim() === '') {
      this.heroes = [];
      return;
    }
    this.heroes = this.heroService.searchHeroes(this.searchTerm);
  }
}
