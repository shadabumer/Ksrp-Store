import { Component, OnInit } from '@angular/core';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchTerm: string = "";
  public items: any[];
  public loadedItems: any[];
  public isSearched: boolean = false;

  constructor(private itemService: ManageItemsService,
    private router: Router) { }

  ngOnInit() {
    this.itemService.getItems()
    .subscribe((itemsList: any) => {
      this.items = this.loadedItems = itemsList;
      console.log('search list:', this.items);
    })
  }

  initItems() {
    this.items = this.loadedItems;
  }

  setFilteredItems() {
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    this.initItems();
    this.isSearched = true;

    if (!searchTerm) this.isSearched = false;
    
    return this.items.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onItemSelected(item: Item) {
    this.isSearched = false;
    this.router.navigate(['item-details'], { queryParams: item });
  }

}
