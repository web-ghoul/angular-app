import { Component, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { server } from '../../../environments/routes-config';

@Component({
  selector: 'app-user-show-section',
  imports: [],
  templateUrl: './user-show-section.component.html',
  styleUrl: './user-show-section.component.css',
})
export class UserShowSectionComponent {
  user = signal<User>({
    id: 0,
    email: '',
    name: {
      firstname: '',
      lastname: '',
    },
    username: '',
    phone: '',
  });
  loading = signal<boolean>(false);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    const id = this.route.snapshot.params['id'];
    try {
      const userRes = await fetch(`${server}/users/${id}`);
      const userData: User = await userRes.json();
      this.user.set(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
