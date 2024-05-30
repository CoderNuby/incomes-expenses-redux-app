import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUserAuth } from '../../models/userAuth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerGroup = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  createUser(){
    if(this.registerGroup.invalid) return;

    Swal.fire({
      title: "Wait...",
      willOpen: ()=> {
        Swal.showLoading()
      },
      showConfirmButton: false
    });

    const { name, email, password } = this.registerGroup.value;

    let user: IUserAuth = { name, email, password }

    this.authService.createUser(user).then((credentials) => {
      Swal.close();
      this.router.navigateByUrl("/");
    }).catch(err => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error Creating user",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
