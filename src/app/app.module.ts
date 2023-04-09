import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './hero/heroes/heroes.component';
import { LogggerPipe } from './shared/pipes/loggger.pipe';
import { HeroSearchComponent } from './hero/hero-search/hero-search.component';
import { HeroEditComponent } from './hero/heroes/hero-edit/hero-edit.component';
import { AddHeroComponent } from './hero/heroes/add-hero/add-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HeroesComponent,
    LogggerPipe,
    HeroSearchComponent,
    HeroEditComponent,
    AddHeroComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
