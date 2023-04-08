import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroForm.get('heroFormId')?.disable();

    const newHeroId = this.heroService.getNewHeroId();
    this.heroForm.get('heroFormId')?.setValue(newHeroId);
  }

  toggleFormMode() {
    this.formMode = !this.formMode;
  }

  onSubmit() {
    console.log(this.heroForm.value);
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
