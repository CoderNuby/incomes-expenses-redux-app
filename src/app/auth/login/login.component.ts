import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUserAuth } from '../../models/userAuth';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginGroup!: FormGroup;

  loading: boolean = false;
  storeSubscribe!: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.loginGroup = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.storeSubscribe = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
      this.storeSubscribe.unsubscribe();
  }

  signIn(){
    if(this.loginGroup.invalid) return;

    this.store.dispatch(uiActions.isLoading());

    const { email, password } = this.loginGroup.value;

    let userAuth: IUserAuth = { name: "", email, password }

    this.authService.loginUser(userAuth).then((credentials) => {
      this.store.dispatch(uiActions.stopLoading());
      let userModel: UserModel = {
        uid: credentials.user.uid,
        email: credentials.user.email!,
        name: credentials.user.displayName!
      }
      this.router.navigateByUrl("/");
    }).catch(err => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Incorrect Credentials",
        showConfirmButton: false,
        timer: 4500,
        text: err
      });
    });
  }
}
