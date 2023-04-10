import { HeroService } from './../../shared/services/hero.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Hero } from '../hero-entity/hero.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'hero-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  myHeroes$!: Observable<{ heroes: Array<Hero> }>;

  constructor(private heroStore: Store<{ hero: { heroes: Array<Hero> } }>) {}

  ngOnInit(): void {
    this.myHeroes$ = this.heroStore.select('hero');
  }
}
