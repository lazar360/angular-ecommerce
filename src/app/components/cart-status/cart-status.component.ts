import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor (private cartService: CartService){}

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // suscribe to the total price
    

    // suscribe to the total quantity

  }
}
