import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  Orders$: Observable<any[]>

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.Orders$ = this.cartService.getOrders()
  }

}
