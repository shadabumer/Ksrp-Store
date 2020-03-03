import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ManageItemsService } from 'src/app/shared/manage-items.service';
import { Item } from 'src/app/models/item.model';
import { Stock } from 'src/app/models/stock.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  isCardSelected: boolean = false;
  isSubmitted: boolean = false;
  isPaymentNotSelected: boolean = true;

  cart: Item[] = [];
  stocks: Stock[] = [];
  subscription: Subscription;

  constructor(private cartService: CartService,
    private itemService: ManageItemsService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      expiry: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    });
    this.cart = this.cartService.getcart();
    this.subscription = this.itemService.getAllStocks()
    .subscribe((stocksData: any[]) => {
      this.stocks = stocksData;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.paymentForm.controls; }

  async onSubmit() {
    this.isSubmitted = true;

    if(!this.isCardSelected) {
      if (this.paymentForm.invalid) return;
      this.paymentForm.reset();
    }

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

    console.log('payment form is submitted');

    this.isSubmitted = false;
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
    this.subscription.unsubscribe();
  }


}
