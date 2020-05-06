import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { OrdersComponent } from './orders/orders.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressPageModule } from './address/address.module';
import { EditProfileComponent } from './profile-details/edit-profile/edit-profile.component';
import { UploadImageComponent } from './profile-details/upload-image/upload-image.component';
import { FileSizeFormatPipe } from 'src/app/pipes/file-size-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountPageRoutingModule,
    AddressPageModule,    
  ],
  declarations: [
    AccountPage, 
    OrdersComponent,
    ProfileDetailsComponent,
    EditProfileComponent,
    UploadImageComponent,
    FileSizeFormatPipe
  ],
  entryComponents: [
    EditProfileComponent, 
    UploadImageComponent,
  ]
})
export class AccountPageModule {}
