import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service.service';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-cart-item',
  imports: [PrimaryButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  product = input.required<Product>();
  count = input<number>(1);
  cartService = inject(CartService);
}
