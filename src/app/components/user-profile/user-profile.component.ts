import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
      <div class="h3" class="navbar-text" *ngIf="auth.user$ | async as user">
        Connexion en cours : {{ user.name }}
      </div>
  `,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
