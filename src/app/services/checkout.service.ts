import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkout: Subject<any>;
  cart = [];

  constructor() {
    this.checkout = new Subject();
  }

  addToCart(id): void {
    const index = this.cart.findIndex(el => el.id === id);

    if (index > -1) {
      this.cart[index].items++;
    } else {
      this.cart.push({id, items: 1});
    }

    this.checkout.next(this.cart);
  }

  removeFromCart(productId): void {
    const index = this.cart.findIndex(el => el.id === productId);

    if (index > -1) {
      if (this.cart[index].items > 1) {
        this.cart[index].items--;
      } else {
        this.cart.splice(index, 1);
      }

      this.checkout.next(this.cart);
    }
  }

  clearCart(): void {
    this.cart = [];
    this.checkout.next(this.cart);
  }

}
