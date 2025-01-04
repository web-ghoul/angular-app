import { Component } from '@angular/core';
import { CartsListSectionComponent } from '../../sections/carts-list-section/carts-list-section.component';

@Component({
  selector: 'app-carts',
  imports: [CartsListSectionComponent],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css',
})
export class CartsComponent {}
