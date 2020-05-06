import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  itemList: any[];
  loadedItems: any[];

  itemListLength: number;
  categoryId: string;
  filterValue: string;

  constructor(public itemService: ManageItemsService, 
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    //fetchng category Id
    this.route.queryParams.subscribe( params => {
      this.categoryId = params.categoryId
    })

    this.itemService.getItemsByCategory(this.categoryId)
      .subscribe( itemList => {
        this.itemList = itemList;
        this.loadedItems = [...itemList];
        this.itemListLength = this.itemList.length;
        console.log('itemslist:', itemList);
      })
    
  }

  onItemSelected(item: Item) {
    this.router.navigate(['item-details'], { queryParams: item });
  }

  addToCart(e, item: Item) {
    e.stopPropagation();
    this.cartService.addProduct(item);
  }

  filter() {
    console.log(this.filterValue);
    this.itemList = [...this.itemList];
    switch(this.filterValue) {
      case 'priceHigh': 
        this.itemList = this.itemList.sort((a, b) => b.price - a.price);
        break;
      case 'priceLow': 
        this.itemList = this.itemList.sort((a, b) => a.price - b.price);
        break;
      default: this.clearFilters(); break;
    }
  }

  clearFilters() {
    this.filterValue = "";

    console.log('loaded items:', this.loadedItems);
    this.itemList = [...this.loadedItems];
  }

}
