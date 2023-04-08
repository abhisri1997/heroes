import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Hero, IHero } from '../../hero-entity/hero.model';
import { HeroService } from 'src/app/shared/services/hero.service';

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
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activeRoute$ = this.activeRoute.params.subscribe((params) => {
      this.heroId = +params['id'];
    });

    this.heroToLoad = this.heroService.getHero(this.heroId);

    this.heroForm = new FormGroup({
      heroId: new FormControl(this.heroToLoad?.id),
      heroName: new FormControl(this.heroToLoad?.name, [Validators.required]),
    });
  }

  onFormSubmit() {
    const heroId = this.heroForm.value.heroId;
    const heroName = this.heroForm.value.heroName;
    if (
      confirm('Are you sure you want to update this hero?') &&
      heroName !== ''
    ) {
      const heroToUpdate: IHero = {
        id: heroId,
        name: heroName,
      };
      this.heroService.updateHero(heroToUpdate);
      this.heroForm.reset();
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

  onDeleteHero() {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.heroService.deleteHero(this.heroId);
      this.goBack();
    }
  }

  ngOnDestroy(): void {
    this.activeRoute$.unsubscribe();
  }
}
