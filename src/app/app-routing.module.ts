import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './hero/heroes/heroes.component';
import { HeroEditComponent } from './hero/heroes/hero-edit/hero-edit.component';
import { AddHeroComponent } from './hero/heroes/add-hero/add-hero.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'hero/:id/edit', component: HeroEditComponent },
  { path: 'hero/add', component: AddHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
