import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { env } from '../../../environments/routes-config';

@Component({
  selector: 'app-hero-section',
  imports: [PrimaryButtonComponent, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  routers = env;
}
