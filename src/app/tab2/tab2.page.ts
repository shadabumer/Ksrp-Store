import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: Category[];

  
  constructor(public categoryService: CategoryService,
              public router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((categoryList: any) => {
        this.categories = categoryList;
      })
  }

  onSelectItem(categoryId: string) {
    this.router.navigate(['item-list'], { queryParams: { categoryId } })
  }

}
