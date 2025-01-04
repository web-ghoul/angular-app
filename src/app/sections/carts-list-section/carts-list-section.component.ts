import { MatInputModule } from '@angular/material/input';
import { Component, signal } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { env, server } from '../../../environments/routes-config';
import { LoadingComponent } from '../../components/loading/loading.component';
import { TitleComponent } from '../../components/title/title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartCardComponent } from '../../components/cart-card/cart-card.component';
import { SecondaryButtonComponent } from '../../components/secondary-button/secondary-button.component';

@Component({
  selector: 'app-carts-list-section',
  imports: [
    LoadingComponent,
    TitleComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    CartCardComponent,
    SecondaryButtonComponent,
  ],
  templateUrl: './carts-list-section.component.html',
  styleUrl: './carts-list-section.component.css',
})
export class CartsListSectionComponent {
  routers = env;
  carts = signal<Cart[]>([]);
  loading = signal<boolean>(false);
  selectedSort = signal<string>('');
  selectedStartDate = signal<string>('');
  selectedEndDate = signal<string>('');

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    await fetch(`${server}/carts`)
      .then((res) => res.json())
      .then((json) => this.carts.set(json));
    this.loading.set(false);
  }

  handleSort = async (value: string) => {
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const sort = queryParams['sort'] || '';
    const startDate = queryParams['startEnd'] || '';
    const endDate = queryParams['endDate'] || '';
    try {
      let oldUrl = `${server}/carts`;
      let url = `${server}/carts`;
      if (sort) {
        url = url + `?sort=${value}`;
        this.selectedSort.set(value);
      }
      if (startDate) {
        if (oldUrl === url) {
          url = url + `?startdate=${startDate}T00:00:00.000Z`;
        } else {
          url = url + `&startdate=${startDate}T00:00:00.000Z`;
        }
        this.selectedSort.set(sort);
      }
      if (endDate) {
        if (oldUrl === url) {
          url = url + `?enddate=${endDate}T00:00:00.000Z`;
        } else {
          url = url + `&enddate=${endDate}T00:00:00.000Z`;
        }
        this.selectedEndDate.set(endDate);
      }
      const cartsRes = await fetch(url);
      const cartsData = await cartsRes.json();
      this.carts.set(cartsData);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: value, startDate, endDate },
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  };

  handleStartDate = async (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const sort = queryParams['sort'] || '';
    const endDate = queryParams['endDate'] || '';
    try {
      let oldUrl = `${server}/carts`;
      let url = `${server}/carts`;
      url = url + `?startdate=${value}T00:00:00.000Z`;
      this.selectedStartDate.set(value);
      if (sort) {
        if (oldUrl === url) {
          url = url + `?sort=${sort}`;
        } else {
          url = url + `&sort=${sort}`;
        }
        this.selectedSort.set(sort);
      }
      if (endDate) {
        if (oldUrl === url) {
          url = url + `?enddate=${endDate}T00:00:00.000Z`;
        } else {
          url = url + `&enddate=${endDate}T00:00:00.000Z`;
        }
        this.selectedEndDate.set(endDate);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { startDate: value, endDate, sort },
          queryParamsHandling: 'merge',
        });
        return;
      }
      const cartsRes = await fetch(url);
      const cartsData = await cartsRes.json();
      this.carts.set(cartsData);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { startDate: value, endDate, sort },
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading.set(false);
    }
  };

  handleEndDate = async (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.loading.set(true);
    const queryParams = this.route.snapshot.queryParams;
    const sort = queryParams['sort'] || '';
    const startDate = queryParams['startDate'] || '';
    try {
      let oldUrl = `${server}/carts`;
      let url = `${server}/carts`;
      url = url + `?endDate=${value}T00:00:00.000Z`;
      this.selectedEndDate.set(value);
      if (sort) {
        if (oldUrl === url) {
          url = url + `?sort=${sort}`;
        } else {
          url = url + `&sort=${sort}`;
        }
        this.selectedSort.set(sort);
      }
      if (startDate) {
        if (oldUrl === url) {
          url = url + `?startdate=${startDate}T00:00:00.000Z`;
        } else {
          url = url + `&startdate=${startDate}T00:00:00.000Z`;
        }
        this.selectedStartDate.set(startDate);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { startDate, endDate: value, sort },
          queryParamsHandling: 'merge',
        });
        return;
      }
      const cartsRes = await fetch(url);
      const cartsData = await cartsRes.json();
      this.carts.set(cartsData);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { startDate, endDate: value, sort },
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
    let url = `${server}/carts`;
    this.router.navigate([this.routers.cartsRoute]);
    const cartsRes = await fetch(url);
    const cartsData = await cartsRes.json();
    this.carts.set(cartsData);
    this.loading.set(false);
    this.selectedSort.set('');
    this.selectedEndDate.set('');
    this.selectedStartDate.set('');
  };
}
