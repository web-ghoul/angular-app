import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartCardComponent } from '../../components/cart-card/cart-card.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  imports: [CartCardComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
}
