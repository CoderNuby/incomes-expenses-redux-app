import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { UserModel } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: UserModel | null = null;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ){}
  
  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe(state => {
      this.user = state.user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logOut(){
    this.authService.signOut().then(() => {
      this.router.navigateByUrl("/login");
    });
  }
}
