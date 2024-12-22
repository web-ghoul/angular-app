import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/products.model';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  imports: [PrimaryButtonComponent, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product = input.required<Product>();

  cartService = inject(CartService);
}
