import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product = signal<Product | undefined>(undefined);
  loading = signal<boolean>(false);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    const id = this.route.snapshot.params['id'];
    try {
      const productRes = await fetch(`https://fakestoreapi.com/products/${id}`);
      const productData = await productRes.json();
      this.product.set(productData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
