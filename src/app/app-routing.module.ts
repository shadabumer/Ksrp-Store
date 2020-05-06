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
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule),
    canActivate: [UnAuthGuard]
  },
  {
    path: 'tabs',
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
    canActivate: [AuthGuard]
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/items/item-details/item-details.module').then( m => m.ItemDetailsPageModule),
    canActivate: [AuthGuard]
    
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/account/address/address.module').then( m => m.AddressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/items/checkout/checkout.module').then( m => m.CheckoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/public/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/public/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule),
    canActivate: [AuthGuard]
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
