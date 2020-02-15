import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { CategoryService } from '../shared/category.service';
import { ManageItemsService } from '../shared/manage-items.service';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  categories: Category[];
  isCategoriesLoaded: boolean = false;
  items: Item[];
  isItemsLoaded: boolean = false;
  
  constructor(public categoryService: CategoryService,
              public itemService: ManageItemsService,
              public cartService: CartService,
              private router: Router) {}

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categoryList: any) => {
        this.categories = categoryList;
        this.isCategoriesLoaded = true;
      })

    this.itemService.getItems()
    .subscribe((itemsList: any) => {
      this.items = itemsList;
      this.isItemsLoaded = true;
    })
  }

  onItemSelected(item: Item) {
    this.router.navigate(['item-details'], { queryParams: item });
  }

  onSelectCategory(categoryId: string) {
    this.router.navigate(['item-list'], { queryParams: { categoryId } })
  }

  addToCart(e, item: Item) {
    e.stopPropagation();
    this.cartService.addProduct(item);
  }

  viewMore(e) {
    e.stopPropagation();
    this.router.navigate(['tabs', 'tab2']);
  }

}
