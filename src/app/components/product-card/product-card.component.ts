import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service.service';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { env } from '../../../environments/routes-config';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  routers = env;
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
