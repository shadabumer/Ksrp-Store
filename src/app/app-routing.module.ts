import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth-guard.guard';
import { OrdersComponent } from './pages/account/orders/orders.component';
// import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate  } from '@angular/fire/auth-guard';


// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule),
    canActivate: [UnAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [UnAuthGuard]
  },
  {
    path: 'item-list',
    loadChildren: () => import('./pages/items/item-list/item-list.module').then( m => m.ItemListPageModule),
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/items/item-details/item-details.module').then( m => m.ItemDetailsPageModule),
    canActivate: [AuthGuard]
    
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/account/address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/items/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
