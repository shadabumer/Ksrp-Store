import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemListPageRoutingModule } from './item-list-routing.module';

import { ItemListPage } from './item-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SearchComponent } from 'src/app/components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemListPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ItemListPage],
  entryComponents: [SearchComponent]
})
export class ItemListPageModule {}
