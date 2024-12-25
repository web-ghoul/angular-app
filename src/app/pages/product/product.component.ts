import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { Product } from '../../models/products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [NgxImageZoomModule, PrimaryButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product = signal<Product>({
    title: '',
    id: 0,
    category: '',
    description: '',
    image: '',
    price: 0,
    rating: {
      rate: 0,
      count: 0,
    },
  });
  loading = signal<boolean>(false);
  cartService = inject(CartService);
  myThumbnail = signal<string>('');
  myFullresImage = signal<string>('');
  starsFilled = signal<number[]>([]);
  starsEmpty = signal<number[]>([]);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    const id = this.route.snapshot.params['id'];
    try {
      const productRes = await fetch(`https://fakestoreapi.com/products/${id}`);
      const productData: Product = await productRes.json();
      this.product.set(productData);
      this.myThumbnail.set(productData.image);
      this.myFullresImage.set(productData.image);
      this.starsFilled.set(
        Array.from({ length: Math.round(productData.rating.rate) })
      );
      this.starsEmpty.set(
        Array.from({ length: 5 - Math.round(productData.rating.rate) })
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
