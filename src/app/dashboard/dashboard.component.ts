import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { Hero } from '../hero/hero-entity/hero.model';

@Component({
  selector: 'hero-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  topHeroes!: Array<Hero>;

  constructor(private heroStore: Store<{ hero: { heroes: Hero[] } }>) {}

  ngOnInit(): void {
    this.heroStore.select('hero').subscribe((hero) => {
      this.topHeroes = hero.heroes.slice(0, 5);
    });
  }
}
