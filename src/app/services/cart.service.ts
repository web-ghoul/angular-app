import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  total = signal<number>(0);
  cartCounter = signal<{ [key: number]: number }>({});

  handleAddToCart = (product: Product) => {
    console.log(this.cartCounter());
    this.cart.set([...this.cart(), product]);
    this.total.set(this.total() + product.price);
    if (this.cartCounter()[product.id]) {
      this.cartCounter()[product.id]++;
    } else {
      this.cartCounter()[product.id] = 1;
    }
  };

  handleClear = () => {
    this.cart.set([]);
    this.total.set(0);
  };

  handleRemoveProduct = (id: number) => {
    let price = 0;
    const newCart = this.cart().filter((product: Product) => {
      if (product.id === id) {
        price += product.price;
      }
      return product.id !== id;
    });
    this.cart.set(newCart);
    this.cartCounter()[id] = 0;
    this.total.set(this.total() - price);
  };

  handleCounterUp = (id: number) => {
    this.cartCounter()[id]++;
  };

  handleCounterDown = (id: number) => {
    if (this.cartCounter()[id] === 1) {
      this.handleRemoveProduct(id);
    } else {
      this.cartCounter()[id]--;
    }
  };

  constructor() {}
}
