import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-product-card',
  imports: [
    PrimaryButtonComponent,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    CategoryCardComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  cartService = inject(CartService);
  starsFilled = signal<number[]>([]);
  starsEmpty = signal<number[]>([]);
  ngOnInit(): void {
    if (this.product()) {
      this.starsFilled.set(
        Array.from({ length: Math.round(this.product().rating.rate) })
      );
      this.starsEmpty.set(
        Array.from({ length: 5 - Math.round(this.product().rating.rate) })
      );
    }
  }
}
