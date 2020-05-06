import { Component, OnInit } from '@angular/core';

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
  isFilterByCategory: boolean = false;

  items: Item[];
  loadedItems: Item[];
  isItemsLoaded: boolean = false;
  filterValue: string;
  categoryValue: string;
  
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
      this.loadedItems = [...itemsList];
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

  filter() {
    console.log(this.filterValue);
    this.items = [...this.items];
    switch(this.filterValue) {
      case 'priceHigh': 
        this.items = this.items.sort((a, b) => b.price - a.price);
        break;
      case 'priceLow': 
        this.items = this.items.sort((a, b) => a.price - b.price);
        break;
      case 'category': this.isFilterByCategory = true; break;
      default: this.clearFilters(); break;
    }
  }

  filterByCategory() {
    this.items = [...this.loadedItems];

    console.log('selected category:', this.categoryValue)
    this.items = this.items.filter(item => item.category === this.categoryValue);
  }

  clearFilters() {
    this.filterValue = "";
    this.categoryValue = "";
    this.isFilterByCategory = false;

    console.log('loaded items:', this.loadedItems);
    this.items = [...this.loadedItems];
  }
}
