import { Component } from '@angular/core';
import { UserShowSectionComponent } from '../../sections/user-show-section/user-show-section.component';

@Component({
  selector: 'app-user',
  imports: [UserShowSectionComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {}
