import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../sections/hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
