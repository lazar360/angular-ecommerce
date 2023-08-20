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
    // check if we already have an item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart && existingCartItem) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

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
      console.log(`name : ${cartItem.name} :
      - price : ${cartItem.unitPrice}, quantity : ${cartItem.quantity}
      subtotal : ${cartItem.unitPrice * cartItem.quantity}
      --------------------------------`);
    });

    console.log(`computeCartTotals :
      - TotalQuantityValue : ${totalQuantityValue} ; 
      - TotalPriceValue : ${totalPriceValue.toFixed(2)} ;`);
  }
}
