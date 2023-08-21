import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(theCartItem: CartItem) {
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );
    }

    if (existingCartItem) existingCartItem.quantity++;
    else this.cartItems.push(theCartItem);

    // compute cart total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach((currentCartItem) => {
      totalQuantityValue += currentCartItem.quantity;
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
    });

    // publish the new values ... all suscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purposes
    this.logCartData(totalQuantityValue, totalPriceValue);
  }

  logCartData(totalQuantityValue: number, totalPriceValue: number) {
    console.log('1/ Contents of the cart');
    this.cartItems.forEach((cartItem) => {
      console.log(`     ${cartItem.quantity} ${cartItem.name} : unit price : ${
        cartItem.unitPrice
      }
      subtotal : ${cartItem.unitPrice * cartItem.quantity}
      --------------------------------`);
    });

    console.log(`2/ computeCartTotals :
      - TotalQuantityValue : ${totalQuantityValue} ; 
      - TotalPriceValue : ${totalPriceValue.toFixed(2)} ;`);
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );
    if (itemIndex > -1) this.cartItems.splice(itemIndex, 1);
    this.computeCartTotals();
  }
}
