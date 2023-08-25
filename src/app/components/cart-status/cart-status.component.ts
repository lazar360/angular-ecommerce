import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent {
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // suscribe to the total price
    this.cartService.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });

    // suscribe to the total quantity
    this.cartService.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    });
  }
}
