import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems: Item[];
  total: Number = 0;

  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.cartItems = this.cartService.getcart();
    this.total = this.cartItems.reduce((i, j) => i + j.price * j.amount, 0);
  }

  goToPayments() {
    this.router.navigate(['payments']);
  }

}
