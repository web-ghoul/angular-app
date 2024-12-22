import { Component, inject, input } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-card',
  imports: [PrimaryButtonComponent, MatIconModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent {
  product = input.required<Product>();
  count = input<number>(1);
  cartService = inject(CartService);
}
