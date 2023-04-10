import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Hero, IHero } from '../../hero-entity/hero.model';
import * as HeroActions from '../../../store/hero/hero.action';

@Component({
  selector: 'hero-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css'],
})
export class HeroEditComponent implements OnInit, OnDestroy {
  heroForm!: FormGroup;
  heroId!: number;
  heroToLoad!: Hero | undefined;
  activeRoute$!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private heroStore: Store<{ hero: { heroes: Array<Hero> } }>
  ) {}

  ngOnInit(): void {
    this.activeRoute$ = this.activeRoute.params.subscribe((params) => {
      this.heroId = +params['id'];
    });

    this.heroStore.select('hero').subscribe((hero) => {
      this.heroToLoad = hero.heroes.find((hero) => hero.id === this.heroId);
    });

    this.heroForm = new FormGroup({
      heroId: new FormControl(this.heroToLoad?.id),
      heroName: new FormControl(this.heroToLoad?.name, [Validators.required]),
      heroColor: new FormControl(this.heroToLoad?.color),
    });
  }

  onFormSubmit() {
    const heroId = this.heroForm.value.heroId;
    const heroName = this.heroForm.value.heroName;
    const heroColor = this.heroForm.value.heroColor;
    if (
      confirm('Are you sure you want to update this hero?') &&
      heroName !== ''
    ) {
      const heroToUpdate: IHero = {
        id: heroId,
        name: heroName,
        color: heroColor,
      };
      this.heroStore.dispatch(new HeroActions.UpdateHero(heroToUpdate));
      this.heroForm.reset();
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

  onDeleteHero() {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.heroStore.dispatch(new HeroActions.DeleteHero(this.heroId));
      this.goBack();
    }
  }

  ngOnDestroy(): void {
    this.activeRoute$.unsubscribe();
  }
}
