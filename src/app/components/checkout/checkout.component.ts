import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs/internal/operators';

import { CheckoutService, WebsocketService, StatusService } from 'src/app/services';
import { PRODUCTS } from 'src/app/products.const';
import { STATUSES } from 'src/app/status.const';
import { CheckoutProduct, CheckoutItem, Product, Message } from 'src/app/interfaces';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: Array<any>;
  total: number;
  status: string;
  statuses = STATUSES;

  constructor(
    private checkoutService: CheckoutService,
    private websocketService: WebsocketService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.checkoutService.checkout.subscribe(items => this.updateTotalAndCartItems(items));

    this.websocketService.socket.pipe(retry(3)).subscribe(
      () => this.socketSuccess(),
      () => this.socketError(),
      () => console.log('connection completed')
    );

    this.statusService.status.subscribe(status => this.updateStatus(status));
  }

  updateTotalAndCartItems(items): void {
    this.cartItems = this.updateCheckout(items);
    this.total = this.getTotal(this.cartItems);
  }

  socketSuccess(): void {
    this.statusService.setStatus(this.statuses.SUCCESS);
    this.checkoutService.clearCart();
  }

  socketError(): void {
    this.statusService.setStatus(this.statuses.ERROR);
  }

  updateStatus(status: string) {
    this.status = status;
  }

  updateCheckout(items: Array<CheckoutItem>): Array<CheckoutProduct> {
    return items.map(item => {
      const info: Product = PRODUCTS.find(el => item.id === el.id);
      const total = Math.round(100 * info.price * item.items) / 100;
      return Object.assign({}, item, { total }, info);
    });
  }

  getTotal(items: Array<CheckoutProduct>): number {
    return items.reduce((total, item) => {
      return Math.round( 100 * (total + item.total)) / 100;
    }, 0);
  }

  removeItem(id): void {
    this.checkoutService.removeFromCart(id);
  }

  charge(): void {
    this.statusService.setStatus(this.statuses.PENDING);
    this.websocketService.send(<Message>{ event: 'purchase', amount: this.total });
  }

  new(): void {
    this.statusService.setStatus(this.statuses.READY);
  }

}
