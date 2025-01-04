import { Component, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { env, server } from '../../../environments/routes-config';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { TitleComponent } from '../../components/title/title.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SecondaryButtonComponent } from '../../components/secondary-button/secondary-button.component';

@Component({
  selector: 'app-users-list-section',
  imports: [
    UserCardComponent,
    TitleComponent,
    LoadingComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    SecondaryButtonComponent,
  ],
  templateUrl: './users-list-section.component.html',
  styleUrl: './users-list-section.component.css',
})
export class UsersListSectionComponent {
  routers = env;
  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  selectedSort = signal<string>('');

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    await fetch(`${server}/users`)
      .then((res) => res.json())
      .then((json) => {
        this.users.set(json);
      });
    this.loading.set(false);
  }

  handleSort = async (value: string) => {
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const sort = queryParams['sort'] || '';
    try {
      let url = `${server}/users`;
      if (sort) {
        url = url + `?sort=${value}`;
        this.selectedSort.set(value);
      }
      const usersRes = await fetch(url);
      const usersData = await usersRes.json();
      this.users.set(usersData);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: value },
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  };

  handleReset = async () => {
    this.loading.set(true);
    let url = `${server}/users`;
    this.router.navigate([this.routers.usersRoute]);
    const usersRes = await fetch(url);
    const usersData = await usersRes.json();
    this.users.set(usersData);
    this.loading.set(false);
    this.selectedSort.set('');
  };
}
