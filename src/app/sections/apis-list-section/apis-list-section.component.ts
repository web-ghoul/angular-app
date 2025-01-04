import { Component } from '@angular/core';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { ApiCardComponent } from '../../components/api-card/api-card.component';
import { env } from '../../../environments/routes-config';

@Component({
  selector: 'app-apis-list-section',
  imports: [ApiCardComponent],
  templateUrl: './apis-list-section.component.html',
  styleUrl: './apis-list-section.component.css',
})
export class ApisListSectionComponent {
  routers = env;
}
