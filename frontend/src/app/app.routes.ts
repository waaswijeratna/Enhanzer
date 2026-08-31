import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { PurchaseBill } from './pages/purchase-bill/purchase-bill';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'purchase-bill',
    component: PurchaseBill,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];