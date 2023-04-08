import { Component } from '@angular/core';

import { HeroService } from '../shared/services/hero.service';
import { Hero } from '../hero/hero-entity/hero.model';

@Component({
  selector: 'hero-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  topHeroes!: ReadonlyArray<Hero>;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.topHeroes = this.getTopHeroes();
  }

  getTopHeroes(): any {
    return this.heroService.getHeroes().slice(0, 5);
  }
}
