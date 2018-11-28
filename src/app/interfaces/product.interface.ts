export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}

export interface CheckoutItem {
  total: number;
  items: number;
}

export interface CheckoutProduct extends Product, CheckoutItem {
}
