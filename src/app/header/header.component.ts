import { Component } from '@angular/core';

@Component({
  selector: 'hero-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  header_title: string = 'Tour of Heroes';
}
