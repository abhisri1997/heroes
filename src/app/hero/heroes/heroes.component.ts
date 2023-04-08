import { HeroService } from './../../shared/services/hero.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Hero } from '../hero-entity/hero.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hero-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  myHeroes!: ReadonlyArray<Hero>;
  heroesSubscription$!: Subscription;
  heroName: string = '';

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.myHeroes = this.heroService.getHeroes();
    this.heroesSubscription$ = this.heroService.heroesUpdated.subscribe(
      (data) => {
        this.myHeroes = data;
      }
    );
  }

  onAddHero() {
    this.heroService.addHero(this.heroName);
    this.heroName = '';
  }

  ngOnDestroy(): void {
    this.heroesSubscription$.unsubscribe();
  }
}
