import { Component, OnInit } from '@angular/core';
import { CheckoutService, WebsocketService, StatusService } from 'src/app/services';
import { PRODUCTS } from 'src/app/products.const';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: Array<any>;
  total: number;
  status: string;

  constructor(
    private service: CheckoutService,
    private connection: WebsocketService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.service.checkout.subscribe(items => {
      this.cartItems = this.updateCheckout(items);
      this.total = this.getTotal(this.cartItems);
    });

    this.connection.socket.subscribe(message => {
      this.statusService.setStatus('success');
      this.service.clearCart();
    });

    this.statusService.status.subscribe(status => {
      this.status = status;
    });
  }

  updateCheckout(items): Array<any> {
    return items.map(item => {
      const info = PRODUCTS.find(el => item.id === el.id);
      const total = Math.round(100 * info.price * item.items) / 100;
      return Object.assign({}, item, { total }, info);
    });
  }

  getTotal(items): number {
    return items.reduce((total, item) => {
      return Math.round( 100 * (total + item.total)) / 100;
    }, 0);
  }

  removeItem(id): void {
    this.service.removeFromCart(id);
  }

  charge() {
    this.statusService.setStatus('pending');
    this.connection.send({ event: 'purchase', amount: this.total });
  }

  new() {
    this.statusService.setStatus('ready');
  }

}
