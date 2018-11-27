import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/interfaces';
import {CheckoutService, StatusService} from 'src/app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  status: string;

  constructor(
    private service: CheckoutService,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    this.statusService.status.subscribe(status => {
      this.status = status;
    });
  }

  addToCart() {
    this.service.addToCart(this.product.id);
  }

}
