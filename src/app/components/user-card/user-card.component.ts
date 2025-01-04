import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { env } from '../../../environments/routes-config';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  user = input.required<User>();
  routers = env;
}
