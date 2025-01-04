import { Component, input } from '@angular/core';
import { env } from '../../../environments/routes-config';
import { Cart } from '../../models/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-card',
  imports: [RouterLink],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent {
  cart = input.required<Cart>();
  routers = env;
}
