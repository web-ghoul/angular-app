import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Component } from '@angular/core';
import { ProductShowSectionComponent } from '../../sections/product-show-section/product-show-section.component';

@Component({
  selector: 'app-product',
  imports: [NgxImageZoomModule, ProductShowSectionComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {}
