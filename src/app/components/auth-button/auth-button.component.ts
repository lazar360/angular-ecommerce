import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button
        style="margin-right: 4px;"
        class="btn btn-primary"
        (click)="
          auth.logout({ logoutParams: { returnTo: document.location.origin } })
        "
      >
        Log out
      </button>

      <button class="btn btn-primary" routerLink="/order-history">
        Orders
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button class="btn btn-primary" (click)="auth.loginWithRedirect()">
        Log in
      </button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent implements OnInit {
  theEmail: any = '';
  storage: Storage = sessionStorage;
  profileJson: string = null!;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) =>
      this.storage.setItem('userEmail', JSON.stringify(profile?.email))
    );
  }
}
