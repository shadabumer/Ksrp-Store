import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Product, CartService } from '../services/cart.service';
import { Item } from '../models/item.model';
import { ManageItemsService } from '../shared/manage-items.service';
import { Stock } from '../models/stock.model';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  cart: Item[] = [];
  stocks: Stock[] = [];
  subscriptions: Subscription[] = [];

  constructor(private cartService: CartService,
    private itemService: ManageItemsService,
    private alertCtrl: AlertController,
    private db: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getcart();
    let subscription: Subscription = this.itemService.getAllStocks()
    .subscribe((stocksData: any[]) => {
      this.stocks = stocksData;
    });
    if(subscription)
      this.subscriptions.push(subscription);
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

  async checkout() {
    // Perfom PayPal or Stripe checkout process

    console.log('cart items:', this.cart);
    this.updateStock();
    this.updateOrders();
    
    this.cartService.emptyCart();
    this.cart = [];

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your items as soon as possible',
      buttons: ['OK']
    });
    alert.present();
    this.router.navigate(['account', 'orders']);

  }

  // Decreasing the stock of selected item
  updateStock() {
    let cartItemStock = [];
    for (let stock of this.stocks) {
      this.cart.forEach(item => {
        if (item.id === stock.stockId) {
          cartItemStock.push(
            {
              stockId: stock.stockId, 
              stock: stock.stock, 
              amount: item.amount
          });
        } 
      })
    }

    cartItemStock.forEach(item => {
      let newStock: Stock = {
        stock: item.stock - item.amount
      }
      this.itemService.updateStock(item.stockId, newStock);
    })
  }

  updateOrders() {
    this.cart.forEach(cartItem => {
      this.cartService.createOrder(cartItem);
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
