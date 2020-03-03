import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Item } from '../models/item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartItem } from '../models/cartItem.model';
import { UsersService } from '../shared/users.service';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Item[] = [];
  private cartItemCount = new BehaviorSubject(0);
  private userId: any;
  private subscription: Subscription;

  constructor(private db: AngularFirestore, private users: UsersService) {
    this.userId = this.users.userDetails().uid;
      this.subscription = this.initCart().subscribe((cartList: any) => {
        this.cart = cartList;
        console.log('cartService cart:', this.cart);
      })
   }

  initCart() {
    return this.db.collection('cart').doc(this.userId).collection('cartItems').snapshotChanges()
    .pipe(map((document) => {
      return document.map(changes => {
        return {
          id: changes.payload.doc.id,
          ...changes.payload.doc.data()
        }
      })
    }))
  }

  getcart() {
    return this.cart;
  }

  emptyCart() {
    this.cart.forEach(item => {
      this.db.collection('cart').doc(this.userId).collection('cartItems').doc(item.id).delete();
    })
    this.cart = [];
    this.subscription.unsubscribe();
      
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product: Item) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        // product.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.addToCartService(product);
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product: Item) {

    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        // product.amount -= 1;
        this.decreaseFromCartService(product, p.amount);
        if (p.amount == 0) {
          p.amount = 1;
          this.cart.splice(index, 1);
          this.removeFromCartService(product.id)
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product: Item) {

    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
        this.removeFromCartService(product.id);
      }
    }
  }

  addToCartService(item: Item) {
    let amount = (item.amount > 1) ? item.amount : 1;

    const cartItem: CartItem = {
      amount,
      date: new Date().toDateString(),
      imageUrl: item.imageUrl,
      name: item.name,
      orderNo: Date.now(),
      price: item.price,
      itemId: item.id,
      status: 'pending',
    }

    this.db.collection('cart').doc(this.userId).collection('cartItems')
    .doc(item.id).set(cartItem);
  }

  removeFromCartService(itemId) {
    this.db.collection('cart').doc(this.userId).collection('cartItems')
    .doc(itemId).delete();
  }

  decreaseFromCartService(item: Item, amount) {
    const cartItem: CartItem = {
      amount,
      date: new Date().toDateString(),
      imageUrl: item.imageUrl,
      name: item.name,
      orderNo: Date.now(),
      price: item.price,
      itemId: item.id,
      status: 'pending',
    }
    this.db.collection('cart').doc(this.userId).collection('cartItems')
    .doc(item.id).set(cartItem);
  }

  createOrder(item: Item) {
    let cartItem: CartItem = {
      amount: item.amount,
      date: new Date().toDateString(),
      imageUrl: item.imageUrl,
      name: item.name,
      orderNo: Date.now(),
      price: item.price,
      itemId: item.id,
      status: 'pending',
    }
    
    const id = `${cartItem.name}${cartItem.orderNo}`.trim();
    this.db.collection('orders').doc(this.userId).collection('orderItems')
    .doc(id).set(cartItem);
  }

  getOrders() {
    return this.db.collection<CartItem[]>('orders').doc(this.userId).collection('orderItems',
    ref => ref.orderBy('orderNo', 'desc').limit(10))
    .snapshotChanges()
    .pipe(map((document) => {
      return document.map(changes => {
        return {
          id: changes.payload.doc.id,
          ...changes.payload.doc.data()
        }
      })
    }))
  }

}
