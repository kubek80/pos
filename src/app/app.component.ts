import { Component } from '@angular/core';
import { PRODUCTS } from './products.const';
import { Product } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Array<Product> = PRODUCTS;
}
