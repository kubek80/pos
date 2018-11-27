import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {
  ProductListComponent,
  CheckoutComponent,
  ProductComponent
} from './components';

import {
  WebsocketService,
  CheckoutService,
  StatusService
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CheckoutComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WebsocketService,
    CheckoutService,
    StatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
