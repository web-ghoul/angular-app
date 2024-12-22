import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductComponent } from '../../components/product/product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-products-list',
  imports: [
    ProductComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);

  async ngOnInit() {
    const productsRes = await fetch('https://fakestoreapi.com/products');
    const productsData = await productsRes.json();
    this.products.set(productsData);

    const categoriesRes = await fetch(
      'https://fakestoreapi.com/products/categories'
    );
    const categoriesData = await categoriesRes.json();
    this.categories.set(categoriesData);
  }
}
