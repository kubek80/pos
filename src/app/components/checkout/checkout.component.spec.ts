import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckoutComponent } from './checkout.component';

import { CheckoutService, WebsocketService, StatusService } from 'src/app/services';

import { STATUSES } from '../../status.const';
import {CheckoutProduct} from "../../interfaces/product.interface";

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let checkoutService: CheckoutService;
  let websocketService: WebsocketService;
  let statusService: StatusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.get(CheckoutService);
    websocketService = TestBed.get(WebsocketService);
    statusService = TestBed.get(StatusService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component', () => {
    describe('ngOnInit()', () => {
      beforeEach(() => {
        spyOn(checkoutService.checkout, 'subscribe');
        spyOn(websocketService.socket, 'subscribe');
        spyOn(statusService.status, 'subscribe');
        component.ngOnInit();
      });

      it('should subscribe to checkout service', () => {
        expect(checkoutService.checkout.subscribe).toHaveBeenCalled;
      });

      it('should subscribe to websocket service', () => {
        expect(websocketService.socket.subscribe).toHaveBeenCalled;
      });

      it('should subscribe to status service', () => {
        expect(statusService.status.subscribe).toHaveBeenCalled;
      });
    });

    describe('updateTotalAndCartItems()', () => {
      it('shoud set cart items and total', () => {
        spyOn(component, 'updateCheckout').and.returnValue([]);
        spyOn(component, 'getTotal').and.returnValue(10);
        component.updateTotalAndCartItems('test');
        expect(component.updateCheckout).toHaveBeenCalledWith('test');
        expect(component.getTotal).toHaveBeenCalledWith([]);
        expect(component.cartItems).toEqual([]);
        expect(component.total).toBe(10);
      });
    });

    describe('socketSuccess()', () => {
      it('should set status to success and call checkout clear method', () => {
        spyOn(statusService, 'setStatus');
        spyOn(checkoutService, 'clearCart');
        component.socketSuccess();
        expect(statusService.setStatus).toHaveBeenCalledWith(STATUSES.SUCCESS);
        expect(checkoutService.clearCart).toHaveBeenCalled;
      });
    });

    describe('socketError()', () => {
      it('should set status to error', () => {
        spyOn(statusService, 'setStatus');
        component.socketError();
        expect(statusService.setStatus).toHaveBeenCalledWith(STATUSES.ERROR);
      });
    });

    describe('updateStatus()', () => {
      it('should update status', () => {
        component.updateStatus('test');
        expect(component.status).toBe('test');
      });
    });

    describe('updateCheckout()', () => {
      it('should decorate checkout items with product information and product total', () => {
        const mock = [{ id: '1', items: 3, total: 0 }, { id: '2', items: 2, total: 0 }];
        const expectation = [
          { id: '1', image: 'assets/avocado.png', items: 3, name: 'Avocado', price: 5.4, total: 16.2},
          { id: '2', image: 'assets/chocolate-strawberry.png', items: 2, name: 'Chocolate', price: 6.4, total: 12.8 }
        ];
        const test = component.updateCheckout(mock);
        expect(test).toEqual(expectation);
      });
    });

    describe('getTotal()', () => {
      it('should calculate total', () => {
        const mock = [
          { id: '1', image: 'assets/avocado.png', items: 3, name: 'Avocado', price: 1, total: 3},
          { id: '2', image: 'assets/chocolate-strawberry.png', items: 2, name: 'Chocolate', price: 2, total: 4 }
        ];
        const test = component.getTotal(mock);
        expect(test).toBe(7);
      });
    });

    describe('removeItem()', () => {
      it('should call checkout service removeFromCart with id', () => {
        spyOn(checkoutService, 'removeFromCart');
        component.removeItem('test');
        expect(checkoutService.removeFromCart).toHaveBeenCalledWith('test');
      });
    });

    describe('charge()', () => {
      it('should update status and call send method on websocketService', () => {
        spyOn(statusService, 'setStatus');
        spyOn(websocketService, 'send');
        component.total = 10;
        component.charge();
        expect(statusService.setStatus).toHaveBeenCalledWith(STATUSES.PENDING);
        expect(websocketService.send).toHaveBeenCalledWith({event: 'purchase', amount: 10 });
      });
    });

    describe('new()', () => {
      it('should update status', () => {
        spyOn(statusService, 'setStatus');
        component.new();
        expect(statusService.setStatus).toHaveBeenCalledWith(STATUSES.READY);
      });
    });
  });
});
