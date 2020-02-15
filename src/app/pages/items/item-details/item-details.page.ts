import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  currentItem: any;

  constructor(public route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.currentItem = this.route.snapshot.queryParams;
    console.log('current Item:', this.currentItem);
  }

  addToCart(e) {
    e.stopPropagation();
    this.cartService.addProduct(this.currentItem);
  }

}
