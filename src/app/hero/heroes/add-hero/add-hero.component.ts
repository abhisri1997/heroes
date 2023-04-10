import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Hero } from '../../hero-entity/hero.model';
import * as HeroActions from '../../../store/hero/hero.action';
import { HeroService } from 'src/app/shared/services/hero.service';

@Component({
  selector: 'hero-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
})
export class AddHeroComponent implements OnInit, OnDestroy {
  heroForm: FormGroup = new FormGroup({
    heroFormId: new FormControl(''),
    heroFormName: new FormControl('', [Validators.required]),
    heroFormColor: new FormControl(''),
  });

  formMode: boolean = false;
  colors: string[] = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'black',
    'white',
    'gray',
    'teal',
    'cyan',
    'indigo',
    'violet',
  ];
  heroId!: number;

  constructor(
    private heroService: HeroService,
    private heroStore: Store<{ hero: { heroes: Array<Hero> } }>
  ) {}

  ngOnInit(): void {
    this.heroForm.get('heroFormId')?.disable();

    this.heroId = this.heroService.getNewHeroId();

    this.heroForm.get('heroFormId')?.setValue(this.heroId);
  }

  toggleFormMode() {
    this.formMode = !this.formMode;
  }

  onSubmit() {
    const heroName = this.heroForm.get('heroFormName')?.value;
    const heroColor = this.heroForm.get('heroFormColor')?.value;
    const newHero = new Hero(this.heroId, heroName, heroColor);
    this.heroStore.dispatch(new HeroActions.AddHero(newHero));
    this.resetForm();
  }

  private resetForm() {
    setTimeout(() => {
      this.heroForm.reset();
    }, 10);
    this.toggleFormMode();
  }

  onCancel() {
    this.resetForm();
  }

  ngOnDestroy(): void {}
}
