import { Component } from '@angular/core';
import { UsersListSectionComponent } from '../../sections/users-list-section/users-list-section.component';

@Component({
  selector: 'app-users',
  imports: [UsersListSectionComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
