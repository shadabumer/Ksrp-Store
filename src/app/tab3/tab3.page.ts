import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  cart: Item[] = [];

  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getcart();
  }
  
  ionViewWillEnter() {
    this.cart = this.cartService.getcart();
  }

  decreaseCartItem(product: Item) {
    this.cartService.decreaseProduct(product);
    this.cart = this.cartService.getcart();

  }

  increaseCartItem(product: Item) {
    this.cartService.addProduct(product);
    this.cart = this.cartService.getcart();
  }

  removeCartItem(product: Item) {
    this.cartService.removeProduct(product);
    this.cart = this.cartService.getcart();
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  checkout() {
    console.log('cart items:', this.cart);
    this.router.navigate(['checkout']);
  }

}
