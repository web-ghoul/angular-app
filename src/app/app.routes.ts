import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { CartsComponent } from './pages/carts/carts.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ApisComponent } from './pages/apis/apis.component';
import { env } from '../environments/routes-config';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: env.apisRoute.slice(1),
    component: ApisComponent,
  },
  {
    path: env.productsRoute.slice(1),
    component: ProductsComponent,
  },
  {
    path: `${env.productsRoute.slice(1)}/:id`,
    component: ProductComponent,
  },
  {
    path: env.usersRoute.slice(1),
    component: UsersComponent,
  },
  {
    path: `${env.usersRoute.slice(1)}/:id`,
    component: UserComponent,
  },
  {
    path: env.cartsRoute.slice(1),
    component: CartsComponent,
  },
  {
    path: `${env.cartsRoute.slice(1)}/:id`,
    component: CartComponent,
  },
  { path: '**', component: NotFoundComponent },
];
