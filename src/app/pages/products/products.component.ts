import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsListSectionComponent } from '../../sections/products-list-section/products-list-section.component';

@Component({
  selector: 'app-products',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ProductsListSectionComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
