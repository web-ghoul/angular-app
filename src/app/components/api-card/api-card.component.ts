import { Component, input } from '@angular/core';
import { ReactiveNode } from '@angular/core/primitives/signals';
import { env } from '../../../environments/routes-config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-api-card',
  imports: [RouterLink],
  templateUrl: './api-card.component.html',
  styleUrl: './api-card.component.css',
})
export class ApiCardComponent {
  routers = env;
  title = input<string>('');
  link = input<string>('');
}
