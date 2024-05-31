import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../../models/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: UserModel | null = null;
  storeSubscription!: Subscription;

  constructor(private store: Store<AppState>){ }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(state => {
      this.user = state.user;
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
