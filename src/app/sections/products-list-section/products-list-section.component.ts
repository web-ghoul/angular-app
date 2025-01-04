import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TitleComponent } from '../../components/title/title.component';
import { env, server } from '../../../environments/routes-config';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SecondaryButtonComponent } from '../../components/secondary-button/secondary-button.component';

@Component({
  selector: 'app-products-list-section',
  imports: [
    ProductCardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    TitleComponent,
    LoadingComponent,
    SecondaryButtonComponent,
  ],
  templateUrl: './products-list-section.component.html',
  styleUrl: './products-list-section.component.css',
})
export class ProductsListSectionComponent {
  routers = env;
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
      let url = `${server}/products`;
      if (category) {
        url = url + `/category/${category}`;
      }
      if (sort) {
        url = url + `?sort=${sort}`;
      }
      const productsRes = await fetch(url);
      const productsData = await productsRes.json();
      this.products.set(productsData);
      this.loading.set(false);
      const categoriesRes = await fetch(`${server}/products/categories`);
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
      let url = `${server}/products`;
      if (value) {
        url = url + `/category/${value}`;
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
      let url = `${server}/products`;
      if (category) {
        url = url + `/category/${category}`;
      }
      url = url + `?sort=${value}`;
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

  handleReset = async () => {
    this.loading.set(true);
    let url = `${server}/products`;
    this.router.navigate([this.routers.productsRoute]);
    const cartsRes = await fetch(url);
    const productsData = await cartsRes.json();
    this.products.set(productsData);
    this.loading.set(false);
    this.selectedSort.set('');
    this.selectedCategory.set('');
  };
}
