import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPageRoutingModule } from './item-details-routing.module';

import { ItemDetailsPage } from './item-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SearchComponent } from 'src/app/components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemDetailsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ItemDetailsPage],
  entryComponents: [SearchComponent]
})
export class ItemDetailsPageModule {}
