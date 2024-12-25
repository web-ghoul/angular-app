import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [
    ProductCardComponent,
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
  loading = signal<boolean>(false);
  selectedCategory = signal<string | null>(null);
  selectedSort = signal<string | null>(null);

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const category = queryParams['category'] || '';
    const sort = queryParams['sort'] || '';
    this.selectedCategory.set(category);
    this.selectedSort.set(sort);
    try {
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = url + `/category/${category}`;
      }
      if (sort) {
        url = url + `?sort=${sort}`;
      }
      const productsRes = await fetch(url);
      const productsData = await productsRes.json();
      this.products.set(productsData);
      const categoriesRes = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const categoriesData = await categoriesRes.json();
      this.categories.set(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  }

  handleCategoryChange = async (value: string) => {
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const category = queryParams['category'] || '';
    const sort = queryParams['sort'] || '';
    this.selectedCategory.set(category);
    this.selectedSort.set(sort);
    try {
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = url + `/category/${category}`;
      }
      if (sort) {
        url = url + `?sort=${sort}`;
      }
      const productsRes = await fetch(url);
      const productsData = await productsRes.json();
      this.products.set(productsData);
      this.selectedCategory.set(value);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: value, sort: this.selectedSort() },
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  };

  handleSort = async (value: string) => {
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const category = queryParams['category'] || '';
    const sort = queryParams['sort'] || '';
    this.selectedCategory.set(category);
    this.selectedSort.set(sort);
    try {
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url = url + `/category/${category}`;
      }
      if (sort) {
        url = url + `?sort=${sort}`;
      }
      const productsRes = await fetch(url);
      const productsData = await productsRes.json();
      this.products.set(productsData);
      this.selectedSort.set(value);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: this.selectedCategory(), sort: value },
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  };
}
