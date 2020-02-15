import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';
import { OrdersComponent } from './orders/orders.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressPage } from './address/address.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'profile-details',
    component: ProfileDetailsComponent
  },
  {
    path: 'address',
    component: AddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
