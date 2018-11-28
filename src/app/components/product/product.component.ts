import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { CheckoutService, StatusService } from 'src/app/services';
import { STATUSES } from 'src/app/status.const';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  status: string;
  statuses = STATUSES;

  constructor(
    private checkoutService: CheckoutService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.statusService.status.subscribe(status => {
      this.status = status;
    });
  }

  addToCart(): void {
    this.checkoutService.addToCart(this.product.id);
  }

}
