import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CartService } from './services/cart.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(CartService);
      const ids = await dataService.getIds();
      return ids.map((id) => ({ id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
