import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUserAuth } from '../../models/userAuth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{

  registerGroup!: FormGroup;
  storeSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ){}

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.registerGroup = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.storeSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  createUser(){
    if(this.registerGroup.invalid) return;

    this.store.dispatch(uiActions.isLoading())
    
    const { name, email, password } = this.registerGroup.value;
    
    let user: IUserAuth = { name, email, password }
    
    this.authService.createUser(user).then((credentials) => {
      this.store.dispatch(uiActions.stopLoading())
      this.router.navigateByUrl("/");
    }).catch(err => {
      this.store.dispatch(uiActions.stopLoading())
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error Creating user",
        showConfirmButton: false,
        timer: 4500,
        text: err
      });
    });
  }
}
